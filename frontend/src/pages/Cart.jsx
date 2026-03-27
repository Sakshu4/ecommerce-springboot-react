import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, getCart } from '../api';

const EMOJIS = ['🎧', '🖥️', '📱', '⌚', '🎮', '📷', '🔊', '💡', '🖨️', '⌨️'];
const GRADIENTS = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6'];

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount);
}

function getGradient(id) { return GRADIENTS[(id - 1) % GRADIENTS.length]; }
function getEmoji(id) { return EMOJIS[(id - 1) % EMOJIS.length]; }

function Cart({ currentUser, role, cartRefreshKey }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!currentUser?.id) { setLoading(false); return; }
      try {
        setError('');
        setLoading(true);
        const [cartData, productData] = await Promise.all([
          getCart(currentUser.id),
          fetchProducts(role || 'USER'),
        ]);
        setCart(cartData);
        setProducts(productData);
      } catch (err) {
        setError(err.message || 'Unable to load cart.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUser?.id, role, cartRefreshKey]);

  const productById = useMemo(() => {
    return products.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});
  }, [products]);

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (productById[item.productId]?.price || 0) * item.quantity;
  }, 0);

  if (!currentUser?.id) {
    return (
      <div>
        <div className="cart-page-header">
          <h1 className="page-title">Your Bag</h1>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🔐</div>
          <h3>Login to view your bag</h3>
          <p>Sign in to see your saved items and checkout. It only takes a minute!</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn primary" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="btn ghost" onClick={() => navigate('/signup')}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="cart-page-header">
          <h1 className="page-title">Your Bag</h1>
        </div>
        <div className="loading-center">
          <div className="spinner" />
          <span>Loading your bag items…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="page-title">Your Bag</h1>
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <div className="cart-page-header">
          <h1 className="page-title">Your Bag</h1>
          <p className="page-subtitle">Review your items before placing the order.</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🛍️</div>
          <h3>Your bag is empty</h3>
          <p>Looks like you haven't added any items yet. Explore our collection and find something you love!</p>
          <button className="btn primary" style={{ marginTop: 8 }} onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1 className="page-title">Your Bag</h1>
        <p className="page-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your bag</p>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-card">
          <div className="cart-items-header">
            <span>Items</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{cartItems.length} products</span>
          </div>
          {cartItems.map((item) => {
            const product = productById[item.productId];
            const linePrice = (product?.price || 0) * item.quantity;
            return (
              <div key={item.ciId} className="cart-item">
                <div className={`cart-item-image ${getGradient(item.productId)}`}>
                  {getEmoji(item.productId)}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{product?.name || `Product #${item.productId}`}</div>
                  <div className="cart-item-qty">
                    Quantity: <span className="qty-badge">{item.quantity}</span>
                    {product?.price && (
                      <span style={{ marginLeft: 6, color: 'var(--text-light)', fontSize: 12 }}>
                        × {formatINR(product.price)} each
                      </span>
                    )}
                  </div>
                </div>
                <div className="cart-item-price">{formatINR(linePrice)}</div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <span className="free-tag">FREE</span>
          </div>
          <div className="summary-line">
            <span>GST &amp; Taxes</span>
            <span>Included</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <button
            className="btn primary w-full checkout-btn lg"
            onClick={() => navigate('/orders')}
          >
            Proceed to Checkout →
          </button>
          <button
            className="btn ghost w-full sm"
            style={{ marginTop: 10 }}
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 12, textAlign: 'center' }}>
            🔒 Secure checkout powered by Shopcart India
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
