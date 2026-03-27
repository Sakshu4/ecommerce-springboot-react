import React, { useEffect, useState } from 'react';
import { addProduct, deleteProduct, fetchProducts } from '../api';
import { formatINR } from '../utils/format';

function Products({ currentUser, role, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [adminForm, setAdminForm] = useState({
    name: '',
    price: '',
    description: '',
  });

  const isAdmin = role === 'ADMIN';

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(role || 'USER');
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [role]);

  const handleAddToBag = async (productId) => {
    try {
      const result = await onAddToCart?.(productId, 1);
      setActionMessage(result?.message || 'Item added to your bag.');
    } catch (err) {
      setActionMessage(err.message || 'Unable to add item to bag.');
    }
  };

  const handleAdminFormChange = (event) => {
    const { name, value } = event.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    setActionMessage('');

    try {
      await addProduct(
        {
          name: adminForm.name,
          price: Number(adminForm.price),
          description: adminForm.description,
        },
        'ADMIN',
      );
      setAdminForm({ name: '', price: '', description: '' });
      setActionMessage('New product added successfully.');
      setLoading(true);
      await loadProducts();
    } catch (err) {
      setActionMessage(err.message || 'Unable to add product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, 'ADMIN');
      setActionMessage('Product deleted successfully.');
      setLoading(true);
      await loadProducts();
    } catch (err) {
      setActionMessage(err.message || 'Unable to delete product.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading products for India...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Trending Products In India</h1>
      {actionMessage && <p className="status-message">{actionMessage}</p>}

      {isAdmin && (
        <form className="list-card admin-form" onSubmit={handleCreateProduct}>
          <h3>Add Product (Admin)</h3>
          <div className="admin-form-grid">
            <input
              type="text"
              name="name"
              value={adminForm.name}
              onChange={handleAdminFormChange}
              placeholder="Product name"
              required
            />
            <input
              type="number"
              name="price"
              value={adminForm.price}
              onChange={handleAdminFormChange}
              placeholder="Price"
              min="1"
              required
            />
            <input
              type="text"
              name="description"
              value={adminForm.description}
              onChange={handleAdminFormChange}
              placeholder="Description"
              required
            />
            <button className="btn primary" type="submit">Add Product</button>
          </div>
        </form>
      )}

      <div className="product-grid" style={{ marginTop: '16px' }}>
        {products.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-image-placeholder" />
            <h3>{p.name}</h3>
            <p className="product-subtitle">{p.description}</p>
            <div className="product-meta">
              <span className="product-price">{formatINR(p.price)}</span>
            </div>
            <div className="product-actions">
              <button className="btn secondary" onClick={() => handleAddToBag(p.id)}>
                Add to Bag
              </button>
              {isAdmin && (
                <button className="btn ghost" onClick={() => handleDeleteProduct(p.id)}>
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Products;
