import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useWishlist } from "../WishlistContext";

const KidsWear = () => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/kidswear');
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching items. Please try again.");
                setLoading(false);
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleWishlistClick = async (item) => {
        if (isInWishlist(item.id)) {
            removeFromWishlist(item.id);
        } else {
            addToWishlist(item);
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const userEmail = localStorage.getItem('mailId');
    
                if (!userId || !token || !userEmail) {
                    navigate('/loginsignup');
                    return;
                }
    
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
    
                const res = await axios.post(`http://localhost:8080/${userId}/addSelectedProducts`, [item], {
                    headers: headers,
                });
                console.log(res.data);
            } catch (error) {
                console.error('Error adding to Wishlist:', error);
                alert('Failed to add to Wishlist. Please try again.');
            }
        }
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-4">
                    {loading && <p>Loading items...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {items.map((item) => (
                        <div className="col-lg-4 col-md-6" key={item.id}>
                            <div className="product-item rounded overflow-hidden">
                                <div className="position-relative overflow-hidden">
                                    <Link to={`/product/${item.id}`}>
                                        <img className="img-fluid" src={item.imageLink} alt="not available" />
                                    </Link>
                                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                                        {item.status}
                                    </div>
                                    <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                                        {item.brand}
                                    </div>
                                </div>
                                <div className="p-4 pb-0">
                                    <h5 className="text-primary mb-3">₹{item.price}</h5>
                                    <a className="d-block h5 mb-2" href={item.link}>
                                        {item.name}
                                    </a>
                                    <p>
                                        <i className="fa fa-tags text-primary me-2"></i>
                                        {item.category}
                                    </p>
                                    <button className={`btn btn-${isInWishlist(item.id) ? 'outline-danger' : 'outline-primary'} btn-sm`} onClick={() => handleWishlistClick(item)}>
                                        <i className="fa fa-heart me-2"></i>
                                        {isInWishlist(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>
                                <div className="d-flex border-top">
                                    <small className="flex-fill text-center border-end py-2">
                                        <i className="fa fa-child text-primary me-2"></i>
                                        Size: {item.size}
                                    </small>
                                    <small className="flex-fill text-center border-end py-2">
                                        <i className="fa fa-info-circle text-primary me-2"></i>
                                        Material: {item.material}
                                    </small>
                                    <small className="flex-fill text-center py-2">
                                        <i className="fa fa-palette text-primary me-2"></i>
                                        Color: {item.color}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KidsWear;
