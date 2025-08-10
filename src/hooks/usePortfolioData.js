import { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../api/apiClient';
import { getPortfolio } from '../api/portfolioAPI';

const API_PRICES_ENDPOINT = '/stock-quotes';
const API_NEWS_ENDPOINT = '/company-news';
const UPDATE_INTERVAL_MS = 30000;

async function fetchStockData(endpoint, symbols) {
    if (!symbols || symbols.length === 0) return {};
    
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        return symbols.reduce((acc, symbol) => {
            acc[symbol.toUpperCase()] = "Loading";
            return acc;
        }, {});
    }

    const symbolsQueryParam = symbols.join(',');
    try {
        const response = await apiClient.get(`${endpoint}?symbols=${symbolsQueryParam}`);
        return response.data;
    } catch (error) {
        if (error.isAuthError) {
            return symbols.reduce((acc, symbol) => {
                acc[symbol.toUpperCase()] = "Loading";
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
                fetchStockData(API_PRICES_ENDPOINT, stockSymbols),
                fetchStockData(API_NEWS_ENDPOINT, stockSymbols)
            ]);

            setPriceData(priceData);
            setNewsData(newsData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message || "Failed to fetch data");
            setPriceData({});
            setNewsData({});
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