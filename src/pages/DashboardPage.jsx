// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';
import NewsWidget from '../components/NewsWidget';
import SentimentWidget from '../components/SentimentWidget';
import PortfolioTable from '../components/PortfolioTable';
import AddStockForm from '../components/AddStockForm';
import { loadStocksFromStorage, saveStocksToStorage } from '../utils/storage';
import { usePortfolioData } from '../hooks/usePortfolioData';

function DashboardPage() {
    const [stocks, setStocks] = useState(loadStocksFromStorage);
    // Destructure with default empty objects to prevent crashes
    const { priceData = {}, newsData = {}, isLoading } = usePortfolioData(stocks);

    useEffect(() => {
        // Only save if stocks is a valid array
        if (Array.isArray(stocks)) {
            saveStocksToStorage(stocks);
        }
    }, [stocks]);
    
    const handleAddStock = (newStock) => {
        setStocks(prevStocks => [...(prevStocks || []), newStock]);
    };

    const handleDeleteStock = (stockNameToDelete) => {
        setStocks(prevStocks => (prevStocks || []).filter(stock => stock.name !== stockNameToDelete));
    };
    
    // Use optional chaining (?.) in case stocks is not an array yet
    const existingStockNames = stocks?.map(s => s.name) || [];

    return (
        <div className="container">
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <ThemeToggle />
            </div>

            <Header />

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/about">What is this page?</Link>
            </div>

            <div className="top-sections">
                <NewsWidget stocks={stocks || []} newsData={newsData} isLoading={isLoading} />
                <SentimentWidget />
            </div>

            <PortfolioTable 
                stocks={stocks || []} // Always pass an array
                priceData={priceData} 
                onDelete={handleDeleteStock} 
            />

            <AddStockForm 
                onAddStock={handleAddStock} 
                existingStockNames={existingStockNames}
            />
        </div>
    );
}

export default DashboardPage;