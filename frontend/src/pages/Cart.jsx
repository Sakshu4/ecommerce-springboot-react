import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts, getCart } from '../api';
import { formatINR } from '../utils/format';

function Cart({ currentUser, role, cartRefreshKey }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!currentUser?.id) {
        setLoading(false);
        return;
      }

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
    return products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});
  }, [products]);

  const cartItems = cart?.items || [];
  const totalAmount = cartItems.reduce((sum, item) => {
    const product = productById[item.productId];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  if (!currentUser?.id) {
    return (
      <div className="page">
        <h1>Your Bag</h1>
        <p>Please login to view your bag.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page">
        <h1>Your Bag</h1>
        <p>Loading your bag items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h1>Your Bag</h1>
        <p className="status-message error">{error}</p>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1>Your Bag</h1>
      {cartItems.length === 0 ? (
        <p>Your selected items will appear here with estimated delivery for your city.</p>
      ) : (
        <>
          <div className="list-card">
            {cartItems.map((item) => {
              const product = productById[item.productId];
              const linePrice = (product?.price || 0) * item.quantity;

              return (
                <article key={item.ciId} className="list-row">
                  <div>
                    <h3>{product?.name || `Product #${item.productId}`}</h3>
                    <p className="list-subtitle">Qty: {item.quantity}</p>
                  </div>
                  <strong>{formatINR(linePrice)}</strong>
                </article>
              );
            })}
          </div>
          <div className="summary-row">
            <span>Total</span>
            <strong>{formatINR(totalAmount)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
