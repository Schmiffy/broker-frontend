// src/api/portfolioAPI.js
import apiClient from './apiClient';

/**
 * Fetches the user's portfolio from the API.
 * @returns {Promise} A promise that resolves with the portfolio data.
 */
export const getPortfolio = () => {
  return apiClient.get('/portfolio');
};

/**
 * Adds a new stock to the user's portfolio.
 * @param {object} stockData - The data for the new stock.
 * @param {string} stockData.symbol - The stock symbol.
 * @param {number} stockData.quantity - The number of shares.
 * @param {number} stockData.average_price - The purchase price.
 * @returns {Promise} A promise that resolves when the stock is added.
 */
export const addStock = (stockData) => {
  return apiClient.post('/portfolio', stockData);
};