import React from 'react';
import PortfolioRow from './PortfolioRow';

function PortfolioTable({ stocks, priceData, onDelete }) {
    return (
        <section className="portfolio-section">
            <table>
                <thead>
                    <tr>
                        <th>Name of the stock</th>
                        <th>Quantity</th>
                        <th>Average Price</th>
                        <th>Current price</th>
                        <th>Current value</th>
                        <th>Earnings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.length > 0 ? (
                        stocks.map(stock => (
                            <PortfolioRow 
                                key={stock.name} 
                                stock={stock} 
                                priceData={priceData} 
                                onDelete={onDelete} 
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                No stocks in your portfolio. Add one below.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default PortfolioTable;