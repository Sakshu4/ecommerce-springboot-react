import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, onLogout, cartCount }) {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(currentUser?.id);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart', badge: cartCount },
    { to: '/orders', label: 'Orders' },
  ];

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => { navigate('/'); setMenuOpen(false); }}>
          <div className="logo-mark">SC</div>
          <div className="logo-text">
            Shopcart <span>India</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="navbar-nav" aria-label="Main navigation">
          {navLinks.map(({ to, label, end, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${badge !== undefined ? ' nav-link-cart' : ''}${isActive ? ' active' : ''}`
              }
            >
              {label}
              {badge > 0 && <span className="cart-badge">{badge > 9 ? '9+' : badge}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <div className="user-chip">
                <div className="user-avatar">{currentUser.name?.[0]?.toUpperCase() || 'U'}</div>
                {currentUser.name}
                <span className={`role-badge ${currentUser.role?.toLowerCase() === 'admin' ? 'admin' : 'user'}`}>
                  {currentUser.role || 'USER'}
                </span>
              </div>
              <button className="btn ghost sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn ghost sm" onClick={() => navigate('/signin')}>
                Login
              </button>
              <button className="btn primary sm" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </>
          )}

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile nav tray */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map(({ to, label, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
            {badge > 0 && (
              <span className="cart-badge" style={{ position: 'static', transform: 'none', marginLeft: 8 }}>
                {badge}
              </span>
            )}
          </NavLink>
        ))}
        <div className="mobile-nav-actions">
          {isLoggedIn ? (
            <button className="btn ghost w-full" onClick={handleLogout}>
              Logout ({currentUser.name})
            </button>
          ) : (
            <>
              <button className="btn ghost" onClick={() => { navigate('/signin'); setMenuOpen(false); }} style={{ flex: 1 }}>Login</button>
              <button className="btn primary" onClick={() => { navigate('/signup'); setMenuOpen(false); }} style={{ flex: 1 }}>Sign Up</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
