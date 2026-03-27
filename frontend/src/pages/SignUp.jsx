import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api';
import { useToast } from '../context/ToastContext';

function SignUp({ onSignedUp }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      const user = await createUser(payload);
      onSignedUp?.(user);
      toast(`Account created! Welcome, ${user.name} 🎉`, 'success');
      navigate('/products');
    } catch (err) {
      toast(err.message || 'Unable to create account. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container animate-fade-up">
        {/* Illustration panel */}
        <div className="auth-illustration">
          <span className="auth-illustration-emoji">🛍️</span>
          <h2>Join Shopcart India</h2>
          <p>Create your account and start shopping with exclusive member benefits.</p>
          <div className="auth-bullets">
            <div className="auth-bullet">
              <span className="auth-bullet-icon">🎁</span>
              <span>10% off your first order</span>
            </div>
            <div className="auth-bullet">
              <span className="auth-bullet-icon">📦</span>
              <span>Track all your orders in one place</span>
            </div>
            <div className="auth-bullet">
              <span className="auth-bullet-icon">⚡</span>
              <span>Faster checkout every time</span>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <div>
            <h1>Create Account</h1>
            <p>Fill in your details to get started</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                className="input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-mobile">Mobile Number</label>
              <input
                id="signup-mobile"
                className="input"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                className="input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signup-role">Account Type</label>
              <select
                id="signup-role"
                className="input"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">User — Shop & Order</option>
                <option value="ADMIN">Admin — Manage Products</option>
              </select>
            </div>

            <button className="btn primary w-full lg" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                  Creating account…
                </>
              ) : 'Create Account →'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/signin">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
