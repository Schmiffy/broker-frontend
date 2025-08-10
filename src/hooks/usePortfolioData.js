import { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../api/apiClient';
import { getPortfolio } from '../api/portfolioAPI';

const API_PRICES_ENDPOINT = '/stock-quotes';
const API_NEWS_ENDPOINT = '/company-news';
const UPDATE_INTERVAL_MS = 10000; // Update every 10 seconds

const PRICES_STORAGE_KEY = 'stockPrices';
const NEWS_STORAGE_KEY = 'stockNews';

async function fetchStockData(endpoint, symbols, storageKey) {
    if (!symbols || symbols.length === 0) return {};
    
    // First try to get from session storage
    try {
        const storedData = sessionStorage.getItem(storageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Check if we have data for all symbols
            const hasAllSymbols = symbols.every(symbol => parsedData[symbol.toUpperCase()]);
            if (hasAllSymbols) {
                return parsedData;
            }
        }
    } catch (e) {
        console.error('Error reading from session storage:', e);
    }
    
    // If not in storage or missing symbols, fetch from API
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        return symbols.reduce((acc, symbol) => {
            acc[symbol.toUpperCase()] = "Login required";
            return acc;
        }, {});
    }

    const symbolsQueryParam = symbols.join(',');
    try {
        const response = await apiClient.get(`${endpoint}?symbols=${symbolsQueryParam}`);
        // Store the new data in session storage
        sessionStorage.setItem(storageKey, JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        if (error.isAuthError) {
            return symbols.reduce((acc, symbol) => {
                acc[symbol.toUpperCase()] = "Login required";
                return acc;
            }, {});
        }
        return symbols.reduce((acc, symbol) => {
            acc[symbol.toUpperCase()] = "Fetch Error";
            return acc;
        }, {});
    }
}

export const usePortfolioData = (stocks = []) => {
    const [priceData, setPriceData] = useState({});
    const [newsData, setNewsData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Safely map symbols from provided stocks
    const stockSymbols = useMemo(() => {
        return (Array.isArray(stocks) ? stocks : [])
            .filter(stock => stock && stock.symbol)
            .map(stock => stock.symbol.toUpperCase());
    }, [stocks]);

    const refreshAllData = useCallback(async () => {
        if (stockSymbols.length === 0) {
            setPriceData({});
            setNewsData({});
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const [priceData, newsData] = await Promise.all([
                fetchStockData(API_PRICES_ENDPOINT, stockSymbols, PRICES_STORAGE_KEY),
                fetchStockData(API_NEWS_ENDPOINT, stockSymbols, NEWS_STORAGE_KEY)
            ]);

            setPriceData(priceData);
            setNewsData(newsData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message || "Failed to fetch data");
            
            // Try to get data from storage as fallback
            try {
                const storedPrices = sessionStorage.getItem(PRICES_STORAGE_KEY);
                const storedNews = sessionStorage.getItem(NEWS_STORAGE_KEY);
                setPriceData(storedPrices ? JSON.parse(storedPrices) : {});
                setNewsData(storedNews ? JSON.parse(storedNews) : {});
            } catch (storageError) {
                console.error("Failed to get fallback data from storage:", storageError);
                setPriceData({});
                setNewsData({});
            }
        } finally {
            setIsLoading(false);
        }
    }, [stockSymbols]);

    // Set up interval for data refresh
    useEffect(() => {
        refreshAllData(); // Initial fetch
        const interval = setInterval(refreshAllData, UPDATE_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [refreshAllData]);

    return {
        priceData,
        newsData,
        isLoading,
        error,
        refreshAllData
    };
};