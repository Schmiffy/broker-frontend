export const loadStocksFromStorage = () => {
    try {
        const storedStocks = localStorage.getItem('brokerStocksPortfolio');
        if (storedStocks) {
            const parsedStocks = JSON.parse(storedStocks);
            // Ensure it's an array before returning
            if (Array.isArray(parsedStocks)) {
                return parsedStocks.map(s => ({
                    name: s.name,
                    quantity: s.quantity,
                    avgPrice: s.avgPrice,
                }));
            }
        }
    } catch (error) {
        // If parsing fails, the data is corrupt. Log it and start fresh.
        console.error("Could not parse stocks from local storage, starting fresh.", error);
        localStorage.removeItem('brokerStocksPortfolio'); // Clean up bad data
    }
    // Return an empty array if anything goes wrong
    return [];
};

export const saveStocksToStorage = (stocks) => {
    try {
        // Only store the data the user entered
        const stocksToStore = stocks.map(s => ({
            name: s.name,
            quantity: s.quantity,
            avgPrice: s.avgPrice
        }));
        localStorage.setItem('brokerStocksPortfolio', JSON.stringify(stocksToStore));
    } catch (error) {
        console.error("Could not save stocks to local storage", error);
    }
};