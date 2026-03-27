import React from 'react';
import { formatINR } from '../utils/format';

const featuredItems = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    subtitle: 'Clear calls for metro rides and workdays.',
    price: 2999,
  },
  {
    id: 2,
    name: 'Noise Cancelling Headphones',
    subtitle: 'Balanced sound tuned for Bollywood and podcasts.',
    price: 5499,
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    subtitle: 'Party-ready bass with 12-hour battery life.',
    price: 3499,
  },
  {
    id: 4,
    name: 'Gaming Neckband',
    subtitle: 'Low-latency mode for mobile gaming sessions.',
    price: 1999,
  },
];

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-badge">India Specials Live Now</p>
          <h1>Smart Audio Deals For Every Indian City</h1>
          <p className="hero-subtitle">
            Discover top-rated headphones and earbuds with fast delivery, UPI-friendly checkout,
            and prices in INR.
          </p>
          <button className="btn primary">Explore Products</button>
        </div>
        <div className="hero-image-placeholder">
          <span>New Arrival Collection</span>
        </div>
      </section>

      <section className="product-strip">
        <div className="section-header">
          <h2>Picked For Indian Shoppers</h2>
        </div>
        <div className="product-grid">
          {featuredItems.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-image-placeholder" />
              <h3>{item.name}</h3>
              <p className="product-subtitle">{item.subtitle}</p>
              <div className="product-meta">
                <span className="product-price">{formatINR(item.price)}</span>
              </div>
              <button className="btn secondary">Add to Bag</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
