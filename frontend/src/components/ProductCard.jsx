import React from 'react';

const GRADIENTS = [
    'gradient-1',
    'gradient-2',
    'gradient-3',
    'gradient-4',
    'gradient-5',
    'gradient-6',
];

const EMOJIS = ['🎧', '🖥️', '📱', '⌚', '🎮', '📷', '🔊', '💡', '🖨️', '⌨️'];

function getGradient(id) {
    return GRADIENTS[(id - 1) % GRADIENTS.length];
}
function getEmoji(id) {
    return EMOJIS[(id - 1) % EMOJIS.length];
}

function ProductCard({ product, onAddToCart, onDelete, isAdmin, loading }) {
    if (loading) {
        return (
            <div className="product-card-skeleton">
                <div className="skeleton skeleton-image" />
                <div className="skeleton-body">
                    <div className="skeleton skeleton-title" />
                    <div className="skeleton skeleton-desc" />
                    <div className="skeleton skeleton-desc2" />
                    <div className="skeleton skeleton-price" />
                    <div className="skeleton skeleton-btn" />
                </div>
            </div>
        );
    }

    const { id, name, description, price } = product;
    const gradientClass = getGradient(id);
    const emoji = getEmoji(id);
    const isNew = id % 4 === 0;
    const isHot = id % 5 === 1;

    return (
        <article className="product-card">
            <div className={`product-image-area ${gradientClass}`}>
                <span role="img" aria-label={name}>{emoji}</span>
                {isNew && <span className="product-badge new">New</span>}
                {isHot && !isNew && <span className="product-badge hot">Hot</span>}
            </div>
            <div className="product-card-body">
                <h3 className="product-card-name">{name}</h3>
                <p className="product-card-desc">{description || 'Premium quality product available now.'}</p>
                <div className="product-card-footer">
                    <span className="product-price">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
                    </span>
                </div>
            </div>
            <div className="product-card-actions">
                <button className="btn secondary sm" onClick={() => onAddToCart?.(id)}>
                    🛍️ Add to Bag
                </button>
                {isAdmin && (
                    <button className="btn danger sm" onClick={() => onDelete?.(id)}>
                        Delete
                    </button>
                )}
            </div>
        </article>
    );
}

export default ProductCard;
