import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(currentUser?.id);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left" onClick={() => navigate('/')}>
          <div className="logo-mark">SC</div>
          <div className="logo-text">Shopcart India</div>
        </div>

        <nav className="navbar-center">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Cart
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Orders
          </NavLink>
        </nav>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <div className="user-chip">
                {currentUser.name} ({currentUser.role})
              </div>
              <button className="btn ghost" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn ghost" onClick={() => navigate('/signin')}>
                Login
              </button>
              <button className="btn primary" onClick={() => navigate('/signup')}>
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
