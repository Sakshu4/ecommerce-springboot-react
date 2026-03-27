import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api';

function SignIn({ onSignedIn }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await getUserById(userId);
      onSignedIn?.(user);
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Unable to login. Please check your user id.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            User ID
            <input
              type="number"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="Enter your user id"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Continue'}
          </button>
          {error && <p className="status-message error">{error}</p>}
        </form>
        <p className="auth-footer">
          New to Shopcart India? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
