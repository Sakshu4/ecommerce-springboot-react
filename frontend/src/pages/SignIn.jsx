import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../api';
import { useToast } from '../context/ToastContext';

function SignIn({ onSignedIn }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await getUserById(userId);
      onSignedIn?.(user);
      toast(`Welcome back, ${user.name}! 👋`, 'success');
      navigate('/products');
    } catch (err) {
      toast(err.message || 'Invalid user ID. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container animate-fade-up">
        {/* Illustration panel */}
        <div className="auth-illustration">
          <span className="auth-illustration-emoji">🎧</span>
          <h2>Welcome Back!</h2>
          <p>Sign in to access your cart, track orders, and discover exclusive deals.</p>
          <div className="auth-bullets">
            <div className="auth-bullet">
              <span className="auth-bullet-icon">🚚</span>
              <span>Free delivery on all orders</span>
            </div>
            <div className="auth-bullet">
              <span className="auth-bullet-icon">💸</span>
              <span>Exclusive member-only deals</span>
            </div>
            <div className="auth-bullet">
              <span className="auth-bullet-icon">↩️</span>
              <span>Easy 7-day returns</span>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <div>
            <h1>Sign In</h1>
            <p>Enter your credentials to continue shopping</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="signin-userid">User ID</label>
              <input
                id="signin-userid"
                className="input"
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter your user ID"
                required
                min="1"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="btn primary w-full lg" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner spinner-sm" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          <p className="auth-footer-text">
            New to Shopcart India?{' '}
            <Link to="/signup">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
