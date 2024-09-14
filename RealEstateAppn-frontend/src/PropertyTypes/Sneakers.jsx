import { useEffect, useState } from 'react';
import axios from 'axios';

function Sneakers() {
    const [sneakers, setSneakers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:8080/category/sneakers');
                setSneakers(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching sneakers:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (sneakerId) => {
        // Add logic to handle adding to cart
        console.log('Add to Cart:', sneakerId);
        // Example: axios.post('/api/cart', { sneakerId });
    };

    const handleAddToWishlist = (sneakerId) => {
        // Add logic to handle adding to wishlist
        console.log('Add to Wishlist:', sneakerId);
        // Example: axios.post('/api/wishlist', { sneakerId });
    };

    if (isLoading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h2>Sneakers</h2>
            <div className="row">
                {sneakers.length > 0 ? (
                    sneakers.map((sneaker) => (
                        <div key={sneaker.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={sneaker.imageLink} alt={sneaker.pname} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{sneaker.pname}</h5>
                                    <p className="card-text">{sneaker.description}</p>
                                    <p className="card-text">Price: ₹{sneaker.price}</p>
                                    <p className='card-text'>Rating: {sneaker.rating}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCart(sneaker.id)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleAddToWishlist(sneaker.id)}
                                        >
                                            Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No sneakers found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sneakers;
