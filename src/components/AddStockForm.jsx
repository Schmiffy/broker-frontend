import React, { useState } from 'react';

function AddStockForm({ onAddStock, existingStockNames }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [avgPrice, setAvgPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const stockName = name.trim().toUpperCase();
        
        if (!stockName || !quantity || !avgPrice) {
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
            avgPrice: parseFloat(avgPrice)
        });

        // Reset form
        setName('');
        setQuantity('');
        setAvgPrice('');
    };

    return (
        <section className="add-stock-form">
            <h3>Add new Stock...</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="stockName">Stock Name</label>
                        <input type="text" id="stockName" required value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQuantity">Quantity</label>
                        <input type="number" id="stockQuantity" required min="0.000001" step="any" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avgPrice">Average Buying Price</label>
                        <input type="number" id="avgPrice" required min="0" step="any" value={avgPrice} onChange={e => setAvgPrice(e.target.value)} />
                    </div>
                     <button type="submit">Add Stock</button>
                </div>
            </form>
        </section>
    );
}

export default AddStockForm;