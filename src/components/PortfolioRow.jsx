import React from 'react';
import { formatNumber } from '../utils/formatters';
import './PortfolioRow.css';

function PortfolioRow({ stock, priceData, onDelete }) {
    // Guard clause to ensure stock and stock.name are valid and a non-empty string
    if (!stock || typeof stock.name !== 'string' || stock.name.trim() === '') {
        console.error("PortfolioRow: Received invalid or incomplete stock data. Stock:", stock);
        // Render a placeholder row or null to prevent crashing
        return (
            <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--danger-color)' }}>
                    Invalid stock data
                </td>
            </tr>
        );
    }

    const { name, quantity, average_price } = stock;
    const currentPrice = priceData[name.toUpperCase()];
    
    // Derived values
    const isPriceNumber = typeof currentPrice === 'number';
    const currentPriceDisplay = isPriceNumber 
        ? formatNumber(currentPrice) 
        : <span className="placeholder-text">{currentPrice || 'Loading...'}</span>;
    const currentValue = isPriceNumber ? quantity * currentPrice : 0;
    const currentValueDisplay = isPriceNumber 
        ? formatNumber(currentValue, true, true) 
        : <span className="placeholder-text">N/A</span>;
    
    const totalInvested = quantity * average_price;
    const absoluteEarnings = isPriceNumber ? currentValue - totalInvested : 0;
    const percentageEarnings = totalInvested > 0 && isPriceNumber ? (absoluteEarnings / totalInvested) * 100 : 0;
    
    let earningsColor = 'var(--text-color)';
    if (absoluteEarnings > 0.001) earningsColor = 'var(--success-color)';
    else if (absoluteEarnings < -0.001) earningsColor = 'var(--danger-color)';

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            onDelete(name);
        }
    };

    return (
        <tr>
            <td>{name}</td>
            <td>{formatNumber(quantity, false)}</td>
            <td>{formatNumber(average_price)}</td>
            <td>{currentPriceDisplay}</td>
            <td>{currentValueDisplay}</td>
            <td style={{ color: earningsColor }}>
                {isPriceNumber ? (
                    <>
                        {formatNumber(absoluteEarnings, true, true)}
                        <br />
                        <span style={{ fontSize: '0.85em' }}>
                            ({formatNumber(percentageEarnings)}%)
                        </span>
                    </>
                ) : 'N/A'}
            </td>
            <td>
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default PortfolioRow;