import { useState, useEffect, useCallback } from 'react';
import apiClient from './apiClient';

const API_PRICES_ENDPOINT = '/stock-quotes';
const API_NEWS_ENDPOINT = '/company-news';
const UPDATE_INTERVAL_MS = 30000;

async function fetchStockData(endpoint, symbols) {
    if (!symbols || symbols.length === 0) return {};
    const symbolsQueryParam = symbols.join(',');
    try {
        const response = await apiClient.get(`${endpoint}?symbols=${symbolsQueryParam}`);
        return response.data;
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
    }, [symbols.join(',')]);

    useEffect(() => {
        refreshAllData();

        if (symbols.length > 0) {
            const intervalId = setInterval(refreshAllData, UPDATE_INTERVAL_MS);
            return () => clearInterval(intervalId);
        }
    }, [refreshAllData, symbols.length]);

    return { priceData, newsData, isLoading, refreshAllData };
};