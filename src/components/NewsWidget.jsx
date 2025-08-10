import React, { useMemo } from 'react';

function NewsWidget({ stocks, newsData, isLoading }) {
    // Move symbols calculation outside of the news sorting
    const symbols = useMemo(() => 
        (stocks || [])
            .filter(stock => stock && stock.symbol)
            .map(stock => stock.symbol)
            .filter(Boolean)
            .map(symbol => symbol.toUpperCase()),
        [stocks]
    );

    const sortedNews = useMemo(() => {
        if (!stocks || stocks.length === 0) return [];

        let allRelevantNews = [];
        for (const stock of stocks) {
            // Safely access stock symbol
            const stockSymbol = stock?.symbol?.toUpperCase();
            if (!stockSymbol) continue;

            const newsForSymbol = newsData[stockSymbol];
            if (Array.isArray(newsForSymbol)) {
                newsForSymbol.forEach(item => {
                    if (item && item.headline && item.url) {
                        allRelevantNews.push({ ...item, stockSymbol });
                    }
                });
            }
        }
        // Sort by timestamp descending
        return allRelevantNews.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
    }, [stocks, newsData]);

    const renderContent = () => {
        if (isLoading && sortedNews.length === 0) {
            return <p>Loading news...</p>;
        }
        if (!stocks || stocks.length === 0) {
            return <p>Add stocks to see relevant news.</p>;
        }
        if (sortedNews.length === 0) {
            return <p>No relevant news found for your portfolio.</p>;
        }

        return sortedNews.slice(0, 5).map(item => (
            <div className="news-item" key={item.id || item.url}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.headline.length > 80 ? `${item.headline.substring(0, 77)}...` : item.headline}
                </a>
                <span className="news-source">
                    {item.stockSymbol} - {item.source || 'Unknown Source'}
                </span>
            </div>
        ));
    };

    return (
        <section className="news-section">
            <h2>Company News</h2>
            <div className="scrollable-content">
                {renderContent()}
            </div>
        </section>
    );
}

export default NewsWidget;