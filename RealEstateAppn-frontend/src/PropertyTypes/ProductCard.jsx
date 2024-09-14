import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
    return (
        <div className="card h-100">
            <img src={product.imageLink} className="card-img-top" alt={product.pname} />
            <div className="card-body">
                <h5 className="card-title">{product.pname}</h5>
                <p className="card-text">${product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                <button className="btn btn-secondary ml-2">Add to Cart</button>
                <button className="btn btn-outline-secondary ml-2">Add to Wishlist</button>
            </div>
        </div>
    );
}

// PropTypes validation
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        pname: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageLink: PropTypes.string.isRequired, // Ensure this field is required
    }).isRequired,
};

export default ProductCard;
