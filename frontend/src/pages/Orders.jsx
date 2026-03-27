import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';
import { useToast } from '../context/ToastContext';

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount);
}

function Orders({ currentUser }) {
  const [orderResult, setOrderResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handlePlaceOrder = async () => {
    if (!currentUser?.id) {
      toast('Please login before placing an order.', 'error');
      return;
    }
    try {
      setLoading(true);
      const createdOrder = await placeOrder(currentUser.id);
      setOrderResult(createdOrder);
      toast('Order placed successfully! 🎉', 'success');
    } catch (err) {
      toast(err.message || 'Unable to place order.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.id) {
    return (
      <div className="orders-page">
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state">
          <div className="empty-icon">🔐</div>
          <h3>Login to view your orders</h3>
          <p>Sign in to view your order history and track deliveries across India.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn primary" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="btn ghost" onClick={() => navigate('/signup')}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="page-title">My Orders</h1>
      <p className="page-subtitle">Track your active and previous orders, including delivery updates across India.</p>

      {/* Place order card */}
      {!orderResult && (
        <div className="order-checkout-card">
          <div className="order-checkout-info">
            <h2>🛍️ Quick Checkout</h2>
            <p>
              Create an order instantly from your current bag. Free delivery on all orders.
              Estimated delivery: 2–5 business days.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'var(--brand-green)', background: '#e8f5f0', border: '1px solid #a7dfc8', borderRadius: 999, padding: '3px 10px', fontWeight: 700 }}>
                ✓ Free Delivery
              </span>
              <span style={{ fontSize: 12, color: '#7a380f', background: 'var(--brand-orange-light)', border: '1px solid #f5cfb0', borderRadius: 999, padding: '3px 10px', fontWeight: 700 }}>
                🔒 Secure Payment
              </span>
              <span style={{ fontSize: 12, color: '#1d242f', background: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: 999, padding: '3px 10px', fontWeight: 700 }}>
                ↩️ Easy Returns
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <button
              className="btn primary lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                  Placing…
                </>
              ) : '🎉 Place Order'}
            </button>
            <button className="btn ghost sm" onClick={() => navigate('/cart')}>
              ← Back to Cart
            </button>
          </div>
        </div>
      )}

      {/* Order success */}
      {orderResult && (
        <div className="order-success-card">
          <div className="success-icon-wrap">
            <span className="success-icon">✓</span>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you, <strong>{currentUser.name}</strong>! Your order has been confirmed and will be delivered
            within 2–5 business days.
          </p>
          <div className="order-id-chip">
            Order ID: #{orderResult.oId || orderResult.id}
          </div>
          {orderResult.totalAmount > 0 && (
            <div className="order-total-big">{formatINR(orderResult.totalAmount)}</div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => { setOrderResult(null); navigate('/products'); }}>
              Continue Shopping
            </button>
            <button className="btn ghost" onClick={() => setOrderResult(null)}>
              Place Another Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
