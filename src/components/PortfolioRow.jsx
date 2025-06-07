import React from 'react';
import { formatNumber } from '../utils/formatters';

function PortfolioRow({ stock, priceData, onDelete }) {
    const { name, quantity, avgPrice } = stock;
    const currentPrice = priceData[name.toUpperCase()];
    
    // Derived values
    const isPriceNumber = typeof currentPrice === 'number';
    const currentPriceDisplay = isPriceNumber ? formatNumber(currentPrice) : (currentPrice || 'Fetching...');
    const currentValue = isPriceNumber ? quantity * currentPrice : 0;
    const currentValueDisplay = isPriceNumber ? formatNumber(currentValue, true, true) : 'N/A';
    
    const totalInvested = quantity * avgPrice;
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
            <td>{formatNumber(avgPrice)}</td>
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