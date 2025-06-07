import React from 'react';

function SentimentWidget() {
  return (
    <section className="sentiment-section">
      <h2>Upcoming: Portfolio sentiment</h2>
      <div className="scrollable-content" id="sentiment-content">
        <p>StockA sentiment is bad</p>
        <p>StockB sentiment is very good</p>
        <p>....</p>
      </div>
    </section>
  );
}

export default SentimentWidget;