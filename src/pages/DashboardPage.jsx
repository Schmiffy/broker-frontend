import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from '../components/Header';
import NewsWidget from '../components/NewsWidget';
import SentimentWidget from '../components/SentimentWidget';
import PortfolioTable from '../components/PortfolioTable';
import AddStockForm from '../components/AddStockForm';
import { loadStocksFromStorage, saveStocksToStorage } from '../utils/storage';
import { usePortfolioData } from '../hooks/usePortfolioData';

function DashboardPage() {
    const [stocks, setStocks] = useState(loadStocksFromStorage);
    const { priceData, newsData, isLoading } = usePortfolioData(stocks);

    useEffect(() => {
        saveStocksToStorage(stocks);
    }, [stocks]);

    const handleAddStock = (newStock) => {
        setStocks(prevStocks => [...prevStocks, newStock]);
    };

    const handleDeleteStock = (stockNameToDelete) => {
        setStocks(prevStocks => prevStocks.filter(stock => stock.name !== stockNameToDelete));
    };

    const existingStockNames = stocks.map(s => s.name);

    return (
        <div className="container">
            {/* Place the toggle in the top right */}
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                <ThemeToggle />
            </div>

            <Header />

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/about">What is this page?</Link>
            </div>

            {/* ... rest of the component */}
        </div>
    );
}

export default DashboardPage;