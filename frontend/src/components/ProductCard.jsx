import React from 'react';

const GRADIENTS = [
    'gradient-1',
    'gradient-2',
    'gradient-3',
    'gradient-4',
    'gradient-5',
    'gradient-6',
];

// Keyword → emoji mapping, ordered from most specific to least specific
const EMOJI_RULES = [
    { keywords: ['headphone', 'earphone', 'earbud', 'audio'], emoji: '🎧' },
    { keywords: ['keyboard'], emoji: '⌨️' },
    { keywords: ['tv', 'television', 'smart tv', 'monitor'], emoji: '📺' },
    { keywords: ['laptop', 'macbook', 'notebook', 'computer', 'pc'], emoji: '💻' },
    { keywords: ['mobile', 'phone', 'smartphone', 'iphone'], emoji: '📱' },
    { keywords: ['watch', 'smartwatch', 'wearable'], emoji: '⌚' },
    { keywords: ['speaker', 'bluetooth speaker', 'soundbar'], emoji: '🔊' },
    { keywords: ['camera', 'webcam', 'lens', 'dslr'], emoji: '📷' },
    { keywords: ['shoe', 'sneaker', 'boot', 'sandal', 'running'], emoji: '👟' },
    { keywords: ['shirt', 't-shirt', 'tshirt', 'tee', 'cotton', 'jacket', 'hoodie', 'pants', 'jeans', 'cloth', 'dress', 'wear', 'apparel'], emoji: '👕' },
    { keywords: ['bottle', 'flask', 'tumbler', 'water', 'mug', 'cup'], emoji: '🍶' },
    { keywords: ['candle', 'wax', 'scented', 'aroma'], emoji: '🕯️' },
    { keywords: ['wallet', 'purse', 'bag', 'handbag', 'backpack'], emoji: '👜' },
    { keywords: ['stand', 'mount', 'bracket', 'holder', 'desk'], emoji: '🖥️' },
    { keywords: ['tablet', 'ipad'], emoji: '📟' },
    { keywords: ['mouse'], emoji: '🖱️' },
    { keywords: ['charger', 'cable', 'adapter', 'hub', 'usb'], emoji: '🔌' },
    { keywords: ['game', 'gaming', 'gamepad', 'controller', 'joystick'], emoji: '🎮' },
    { keywords: ['book', 'novel', 'magazine'], emoji: '📚' },
    { keywords: ['pen', 'pencil', 'stationery'], emoji: '✏️' },
];

function getEmoji(name = '') {
    const lower = name.toLowerCase();
    for (const rule of EMOJI_RULES) {
        if (rule.keywords.some((kw) => lower.includes(kw))) {
            return rule.emoji;
        }
    }
    return '🛍️'; // generic fallback
}

function getGradient(id) {
    return GRADIENTS[(id - 1) % GRADIENTS.length];
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
    const emoji = getEmoji(name);
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
