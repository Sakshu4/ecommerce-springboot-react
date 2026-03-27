import React, { useState } from 'react';
import { placeOrder } from '../api';
import { formatINR } from '../utils/format';

function Orders({ currentUser }) {
  const [orderResult, setOrderResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (!currentUser?.id) {
      setError('Please login before placing an order.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const createdOrder = await placeOrder(currentUser.id);
      setOrderResult(createdOrder);
    } catch (err) {
      setError(err.message || 'Unable to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page order-page">
      <h1>My Orders</h1>
      <p>Track your active and previous orders, including delivery updates across India.</p>

      <div className="list-card" style={{ marginTop: '16px' }}>
        <article className="list-row">
          <div>
            <h3>Quick Checkout</h3>
            <p className="list-subtitle">Create an order instantly from your current bag.</p>
          </div>
          <button className="btn primary" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? 'Placing...' : 'Place Order'}
          </button>
        </article>
      </div>

      {error && <p className="status-message error">{error}</p>}

      {orderResult && (
        <div className="list-card" style={{ marginTop: '16px' }}>
          <article className="list-row">
            <div>
              <h3>Order #{orderResult.oId}</h3>
              <p className="list-subtitle">User ID: {orderResult.userId}</p>
            </div>
            <strong>{formatINR(orderResult.totalAmount)}</strong>
          </article>
        </div>
      )}
    </div>
  );
}

export default Orders;
