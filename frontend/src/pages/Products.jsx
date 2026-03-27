import React, { useEffect, useState } from 'react';
import { addProduct, deleteProduct, fetchProducts } from '../api';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

function Products({ currentUser, role, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', price: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const isAdmin = (role || '').toUpperCase() === 'ADMIN';

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(role || 'USER');
      setProducts(data);
    } catch (err) {
      toast(err.message || 'Failed to load products.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, [role]);

  const handleAddToBag = async (productId) => {
    const result = await onAddToCart?.(productId, 1);
    if (result?.ok) {
      toast(result.message || 'Item added to your bag!', 'success');
    } else {
      toast(result?.message || 'Please login to add items.', 'error');
    }
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((p) => ({ ...p, [name]: value }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addProduct(
        { name: adminForm.name, price: Number(adminForm.price), description: adminForm.description },
        'ADMIN',
      );
      setAdminForm({ name: '', price: '', description: '' });
      toast('Product added successfully!', 'success');
      await loadProducts();
    } catch (err) {
      toast(err.message || 'Failed to add product.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, 'ADMIN');
      toast('Product deleted.', 'info');
      await loadProducts();
    } catch (err) {
      toast(err.message || 'Failed to delete product.', 'error');
    }
  };

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="products-page">
      {/* Header row */}
      <div className="products-page-header">
        <div>
          <h1 className="page-title">Trending Products In India</h1>
          <p className="page-subtitle">Discover deals on premium electronics, shipped fast across India.</p>
        </div>

        <div className="products-controls">
          {/* Search */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              id="product-search"
              className="input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <span className="products-count-tag">
            {loading ? '…' : `${filtered.length} items`}
          </span>

          {isAdmin && (
            <button
              className={`btn ${showAdminPanel ? 'ghost' : 'primary'} sm`}
              onClick={() => setShowAdminPanel((v) => !v)}
            >
              {showAdminPanel ? '✕ Close' : '+ Add Product'}
            </button>
          )}
        </div>
      </div>

      {/* Admin panel */}
      {isAdmin && showAdminPanel && (
        <form className="admin-panel" onSubmit={handleCreateProduct}>
          <h3>➕ Add New Product</h3>
          <div className="admin-grid">
            <input
              className="input"
              type="text"
              name="name"
              value={adminForm.name}
              onChange={handleAdminChange}
              placeholder="Product name"
              required
            />
            <input
              className="input"
              type="number"
              name="price"
              value={adminForm.price}
              onChange={handleAdminChange}
              placeholder="Price (₹)"
              min="1"
              required
            />
            <input
              className="input"
              type="text"
              name="description"
              value={adminForm.description}
              onChange={handleAdminChange}
              placeholder="Short description"
              required
            />
            <button className="btn primary" type="submit" disabled={submitting}>
              {submitting ? 'Adding…' : '+ Add'}
            </button>
          </div>
        </form>
      )}

      {/* Product grid */}
      <div className="product-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} loading />
          ))
          : filtered.length === 0
            ? (
              <div className="no-products">
                <div className="no-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search term or browse all products.</p>
              </div>
            )
            : filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToBag}
                onDelete={handleDeleteProduct}
                isAdmin={isAdmin}
              />
            ))
        }
      </div>
    </div>
  );
}

export default Products;
