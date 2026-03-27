import React from 'react';
import { useNavigate } from 'react-router-dom';

const featuredItems = [
  { id: 1, name: 'Wireless Earbuds Pro', description: 'Clear calls for metro rides and workdays.', price: 2999 },
  { id: 2, name: 'Noise Cancelling Headphones', description: 'Balanced sound tuned for Bollywood and podcasts.', price: 5499 },
  { id: 3, name: 'Portable Bluetooth Speaker', description: 'Party-ready bass with 12-hour battery life.', price: 3499 },
  { id: 4, name: 'Gaming Neckband', description: 'Low-latency mode for mobile gaming sessions.', price: 1999 },
];

const EMOJIS = ['🎧', '🎵', '🔊', '🎮'];
const GRADIENTS = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-5'];

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount);
}

const features = [
  {
    icon: '🚚',
    color: 'orange',
    title: 'Free Delivery',
    desc: 'Free shipping pan-India on orders above ₹999. Delivered in 2–5 business days.',
  },
  {
    icon: '🔒',
    color: 'green',
    title: 'Secure Payments',
    desc: 'UPI, Net Banking, Cards — all payments 100% encrypted and safe.',
  },
  {
    icon: '↩️',
    color: 'blue',
    title: 'Easy Returns',
    desc: '7-day no-questions-asked returns with hassle-free pickup from your door.',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">India Specials Live Now</span>
          <h1>
            Smart Audio Deals For Every <span>Indian City</span>
          </h1>
          <p className="hero-subtitle">
            Discover top-rated headphones and earbuds with fast delivery, UPI-friendly checkout,
            and prices in INR. Trusted by 50,000+ shoppers across India.
          </p>
          <div className="hero-cta">
            <button className="btn primary lg" onClick={() => navigate('/products')}>
              🛍️ Explore Products
            </button>
            <button className="btn ghost lg" onClick={() => navigate('/signup')}>
              Create Account
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-inner">
            <span className="hero-visual-emoji">🎧</span>
            <h3>New Arrival Collection</h3>
            <p>Premium audio experience, India pricing</p>
            <div className="hero-stat-row">
              <div className="hero-stat">
                <strong>50K+</strong>
                <span>Customers</span>
              </div>
              <div className="hero-stat">
                <strong>200+</strong>
                <span>Products</span>
              </div>
              <div className="hero-stat">
                <strong>4.8★</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="section-heading">
          <div>
            <h2>Why Shop With Us?</h2>
            <p>Built for India, priced for every budget</p>
          </div>
        </div>
        <div className="features-strip">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="section-heading">
          <div>
            <h2>Picked For Indian Shoppers</h2>
            <p>Hand-curated bestsellers with the best value</p>
          </div>
          <button className="btn ghost sm" onClick={() => navigate('/products')}>
            View All →
          </button>
        </div>
        <div className="product-grid">
          {featuredItems.map((item, i) => (
            <article key={item.id} className="product-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`product-image-area ${GRADIENTS[i]}`}>
                <span role="img" aria-label={item.name}>{EMOJIS[i]}</span>
                {i === 0 && <span className="product-badge hot">Hot</span>}
                {i === 3 && <span className="product-badge new">New</span>}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name">{item.name}</h3>
                <p className="product-card-desc">{item.description}</p>
                <div className="product-card-footer">
                  <span className="product-price">{formatINR(item.price)}</span>
                </div>
              </div>
              <div className="product-card-actions">
                <button className="btn secondary sm" onClick={() => navigate('/products')}>
                  🛍️ Shop Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Join 50,000+ Happy Indian Shoppers</h2>
          <p>Get exclusive deals, early access to new products, and free shipping on your first order.</p>
        </div>
        <div className="cta-actions">
          <button className="btn white lg" onClick={() => navigate('/signup')}>
            Create Free Account
          </button>
          <button className="btn outline-white lg" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
