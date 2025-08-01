import React from 'react';
import { Link } from 'react-router-dom';
 // Import the CSS file

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="image-container">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <div className="no-image">
              <span className="no-image-text">No image available</span>
            </div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-details">
            <span className="product-price">${product.price}</span>
            <span className="product-gender">{product.gender}</span>
          </div>
          <p className="product-description">{product.description}</p>
        </div>
      </Link>
      <div className="button-container">
        <button
          className="add-to-order-btn"
          onClick={(e) => {
            e.preventDefault();
            // Add to order functionality would go here
            console.log('Added to order:', product);
          }}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
