import apiClient from '../api/apiClient';

export const STORAGE_KEY = 'brokerStocksPortfolio';
export const API_ENDPOINT = '/portfolio';

// Helper function to validate and format stock data
const formatStockData = (stock) => {
    if (!stock || typeof stock !== 'object') return null;
    
    // Handle both old and new price field names during transition
    const price = Number(stock.average_price || stock.avgPrice);
    if (isNaN(price)) {
        console.warn('Invalid price for stock:', stock);
    }
    
    return {
        symbol: stock.symbol || stock.name, // Ensure we have a symbol
        name: stock.name || stock.symbol,
        quantity: Number(stock.quantity) || 0,
        average_price: price || 0 // Use the converted price
    };
};

export const loadStocksFromStorage = async () => {
    let localStocks = [];
    
    // First try to get from localStorage
    try {
        const storedStocks = localStorage.getItem(STORAGE_KEY);
        if (storedStocks) {
            const parsedStocks = JSON.parse(storedStocks);
            localStocks = Array.isArray(parsedStocks) 
                ? parsedStocks.map(formatStockData).filter(Boolean)
                : [];
        }
    } catch (storageError) {
        console.error("Local storage access failed", storageError);
        localStorage.removeItem(STORAGE_KEY);
    }

    // Check authentication
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        // Return local data when not authenticated
        return {
            success: true,
            data: localStocks,
            source: 'local',
            message: 'Using local data (not logged in)'
        };
    }

    // If we get here, either storage was empty or invalid
    try {
        const response = await apiClient.get(API_ENDPOINT);
        // Ensure response.data is an array
        const responseData = Array.isArray(response?.data) ? response.data : [];
        const stocks = responseData
            .map(formatStockData)
            .filter(Boolean);
        
        if (stocks.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
        }
        return stocks;
    } catch (error) {
        console.error("API fetch failed after storage miss:", error);
        return []; // Always return an array
    }
};

export const saveStocksToStorage = async (stocks) => {
    try {
        // Ensure stocks is an array and format each item
        const stocksToStore = Array.isArray(stocks) 
            ? stocks
                .map(formatStockData)
                .filter(Boolean)
            : [];

        // Always update local storage first
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stocksToStore));

        // Only try API if we have an auth token
        const token = localStorage.getItem('authToken');
        if (!token) {
            return {
                success: true,
                data: stocksToStore,
                source: 'local',
                message: 'Saved to local storage (not logged in)'
            };
        }

        // Attempt to sync with API
        await apiClient.put(API_ENDPOINT, stocksToStore);
        return {
            success: true,
            data: stocksToStore,
            source: 'api',
            message: 'Saved to API and local storage'
        };
    } catch (error) {
        if (error.isAuthError) {
            return {
                success: true,
                data: stocks,
                source: 'local',
                message: 'Saved to local storage only (auth required)'
            };
        }
        console.error('Failed to save stocks:', error);
        throw error;
    }
};