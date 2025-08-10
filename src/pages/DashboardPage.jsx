import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';
import NewsWidget from '../components/NewsWidget';
import SentimentWidget from '../components/SentimentWidget';
import PortfolioTable from '../components/PortfolioTable';
import AddStockForm from '../components/AddStockForm';
import { loadStocksFromStorage, saveStocksToStorage, STORAGE_KEY } from '../utils/storage';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { deleteStock } from '../api/portfolioAPI';

function DashboardPage() {
    const [stocks, setStocks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { priceData = {}, newsData = {}, isLoadingPrices } = usePortfolioData(stocks);

    // Load stocks when component mounts
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setIsLoading(true);
                const result = await loadStocksFromStorage();
                
                // Always use local storage data first
                const localStocks = localStorage.getItem(STORAGE_KEY);
                if (localStocks) {
                    try {
                        const parsedStocks = JSON.parse(localStocks);
                        if (Array.isArray(parsedStocks)) {
                            setStocks(parsedStocks);
                        }
                    } catch (e) {
                        console.error('Error parsing local stocks:', e);
                    }
                }

                // If we have API data, update with that
                if (result && result.data && Array.isArray(result.data)) {
                    setStocks(result.data);
                }
            } catch (error) {
                if (error.isAuthError) {
                    console.log('Working in offline mode');
                } else {
                    console.error('Error loading stocks:', error);
                }
                setStocks([]);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchStocks();
    }, []);

    useEffect(() => {
        // Only save if stocks is a valid array
        if (Array.isArray(stocks)) {
            saveStocksToStorage(stocks);
        }
    }, [stocks]);

    const handleAddStock = (newStock) => {
        setStocks(prevStocks => {
            const safeStocks = Array.isArray(prevStocks) ? prevStocks : [];
            return [...safeStocks, newStock];
        });
    };

    const handleDeleteStock = async (stockNameToDelete) => {
        try {
            // Delete from API first
            await deleteStock(stockNameToDelete);
            
            // If API call succeeds, update local state
            setStocks(prevStocks => {
                const safeStocks = Array.isArray(prevStocks) ? prevStocks : [];
                return safeStocks.filter(stock => stock && stock.name !== stockNameToDelete);
            });
        } catch (error) {
            if (error.isAuthError) {
                console.log('Working in offline mode - updating local storage only');
                // In offline mode, just update local state
                setStocks(prevStocks => {
                    const safeStocks = Array.isArray(prevStocks) ? prevStocks : [];
                    return safeStocks.filter(stock => stock && stock.name !== stockNameToDelete);
                });
            } else {
                console.error('Failed to delete stock:', error);
                alert('Failed to delete stock. Please try again.');
            }
        }
    };

    const existingStockNames = Array.isArray(stocks) 
        ? stocks.filter(s => s && s.name).map(s => s.name)
        : [];

    // Safely map over stocks with extra validation
    const stocksList = Array.isArray(stocks) ? stocks.map(stock => (
        <div key={stock.symbol}>
            {stock.symbol}: {stock.quantity}
        </div>
    )) : null;

    return (
        <div className="container">
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                
                <div className="top-sections">
                    <NewsWidget 
                        stocks={Array.isArray(stocks) ? stocks : []} 
                        newsData={newsData} 
                        isLoading={isLoading} 
                    />
                    <SentimentWidget />
                </div>

                <PortfolioTable
                    stocks={Array.isArray(stocks) ? stocks : []}
                    priceData={priceData}
                    onDelete={handleDeleteStock}
                />

                <AddStockForm
                    onAddStock={handleAddStock}
                    existingStockNames={existingStockNames}
                />
            </div>
        </div>
    );
}

export default DashboardPage;