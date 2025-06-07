export const loadStocksFromStorage = () => {
    try {
        const storedStocks = localStorage.getItem('brokerStocksPortfolio');
        if (storedStocks) {
            // Only load the essential data, let the app fetch fresh prices
            return JSON.parse(storedStocks).map(s => ({
                name: s.name,
                quantity: s.quantity,
                avgPrice: s.avgPrice,
            }));
        }
    } catch (error) {
        console.error("Could not load stocks from local storage", error);
    }
    return []; // Return empty array on failure or if nothing is stored
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