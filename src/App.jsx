import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsWidget from './components/NewsWidget';
import SentimentWidget from './components/SentimentWidget';
import PortfolioTable from './components/PortfolioTable';
import AddStockForm from './components/AddStockForm';
import { loadStocksFromStorage, saveStocksToStorage } from './utils/storage';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
    const [stocks, setStocks] = useState(loadStocksFromStorage);
    const { priceData, newsData, isLoading, refreshAllData } = usePortfolioData(stocks);

    // Effect to save stocks to localStorage whenever they change
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
            <Header />

            <div className="top-sections">
                <NewsWidget stocks={stocks} newsData={newsData} isLoading={isLoading} />
                <SentimentWidget />
            </div>

            <PortfolioTable 
                stocks={stocks} 
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

export default App;