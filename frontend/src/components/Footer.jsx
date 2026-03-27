import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <div className="logo-mark">SC</div>
                            <div className="logo-text" style={{ color: '#fff' }}>
                                Shopcart <span style={{ color: '#f97316' }}>India</span>
                            </div>
                        </div>
                        <p className="footer-brand-tagline">
                            Your trusted destination for premium electronics and gadgets. Fast delivery across India.
                        </p>
                        <div className="footer-newsletter">
                            <input type="email" placeholder="Subscribe for deals..." aria-label="Newsletter email" />
                            <button className="btn primary sm">Go</button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="footer-links-heading">Shop</p>
                        <ul className="footer-links">
                            <li><a href="/products" className="footer-link">All Products</a></li>
                            <li><a href="/cart" className="footer-link">My Cart</a></li>
                            <li><a href="/orders" className="footer-link">My Orders</a></li>
                            <li><a href="/products" className="footer-link">New Arrivals</a></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <p className="footer-links-heading">Account</p>
                        <ul className="footer-links">
                            <li><a href="/signin" className="footer-link">Sign In</a></li>
                            <li><a href="/signup" className="footer-link">Create Account</a></li>
                            <li><a href="/orders" className="footer-link">Track Order</a></li>
                            <li><a href="/" className="footer-link">Help &amp; Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <span>© 2025 Shopcart India. All rights reserved.</span>
                    <div className="footer-socials">
                        <a href="/" className="social-btn" aria-label="Twitter" title="Twitter">𝕏</a>
                        <a href="/" className="social-btn" aria-label="Instagram" title="Instagram">📸</a>
                        <a href="/" className="social-btn" aria-label="LinkedIn" title="LinkedIn">in</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
