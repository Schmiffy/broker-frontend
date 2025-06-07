import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://api.bro-ker.com';
const API_PRICES_ENDPOINT = `${API_BASE_URL}/api/stock-quotes`;
const API_NEWS_ENDPOINT = `${API_BASE_URL}/api/company-news`;
const UPDATE_INTERVAL_MS = 30000;

async function fetchStockData(endpoint, symbols) {
    if (!symbols || symbols.length === 0) return {};
    const symbolsQueryParam = symbols.join(',');
    try {
        const response = await fetch(`${endpoint}?symbols=${symbolsQueryParam}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        // Create an error object for each symbol on failure
        return symbols.reduce((acc, symbol) => {
            acc[symbol.toUpperCase()] = "Fetch Error";
            return acc;
        }, {});
    }
}

export const usePortfolioData = (stocks) => {
    const [priceData, setPriceData] = useState({});
    const [newsData, setNewsData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const symbols = stocks.map(s => s.name.toUpperCase());

    const refreshAllData = useCallback(async () => {
        if (symbols.length === 0) {
            setPriceData({});
            setNewsData({});
            return;
        }

        setIsLoading(true);
        const [prices, news] = await Promise.all([
            fetchStockData(API_PRICES_ENDPOINT, symbols),
            fetchStockData(API_NEWS_ENDPOINT, symbols)
        ]);
        setPriceData(prices);
        setNewsData(news);
        setIsLoading(false);
    }, [symbols.join(',')]); // Dependency on joined symbols string

    useEffect(() => {
        refreshAllData(); // Initial fetch

        if (symbols.length > 0) {
            const intervalId = setInterval(refreshAllData, UPDATE_INTERVAL_MS);
            // Cleanup function to clear interval when component unmounts or symbols change
            return () => clearInterval(intervalId);
        }
    }, [refreshAllData, symbols.length]); // Re-run effect if refresh function or number of symbols changes

    return { priceData, newsData, isLoading, refreshAllData };
};