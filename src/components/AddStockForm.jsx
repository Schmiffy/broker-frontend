import React, { useState } from 'react';
import './AddStockForm.css'; // Import the CSS file

function AddStockForm({ onAddStock, existingStockNames }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [average_price, setAveragePrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const stockName = name.trim().toUpperCase();
        
        if (!stockName || !quantity || !average_price) {
            alert('Please fill in all fields.');
            return;
        }
        if (existingStockNames.includes(stockName)) {
             alert(`Stock ${stockName} is already in your portfolio.`);
             return;
        }

        onAddStock({
            name: stockName,
            quantity: parseFloat(quantity),
            average_price: parseFloat(average_price)
        });

        // Reset form
        setName('');
        setQuantity('');
        setAveragePrice('');
    };

    return (
        <section className="add-stock-form">
            <h3>Add new Stock...</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="stockName">Stock Ticker</label>
                        <input type="text" id="stockName" required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQuantity">Quantity</label>
                        <input type="number" id="stockQuantity" required min="0.000001" step="any" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="average_price">Average Buying Price</label>
                        <input type="number" id="average_price" required min="0" step="any" value={average_price} onChange={e => setAveragePrice(e.target.value)} />
                    </div>
                     <button type="submit">Add Stock</button>
                </div>
            </form>
        </section>
    );
}

export default AddStockForm;