import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import { useWishlist } from "./WishlistContext";

const UserWishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}/products`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders. Please try again.');
        console.error('Error fetching orders:', error);
      }
    };

    if (userId && token) {
      fetchOrders();
    }
  }, [userId, token]);

  const handleRemove = async (pid) => {
    try {
      await axios.delete(`http://localhost:8080/user/${userId}/products/deleteProduct/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      removeFromWishlist(pid); 
      setOrders(orders.filter(order => order.pid !== pid));
    } catch (error) {
      setError('Error removing product. Please try again.');
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <h2>Properties Liked By You</h2>
        {orders.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div>
            {orders.map((wishlistItem) => (
              <div className="row d-flex justify-content-center" key={wishlistItem.pid}>
                <div className="col-lg-4 col-md-6" style={{ width: 800 }}>
                  <div className="row property-item rounded overflow-hidden">
                    <div className="col-6 position-relative overflow-hidden">
                      <img className="img-fluid" src={wishlistItem.imageLink} alt="not available" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                      <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        {wishlistItem.status}
                      </div>
                      <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                        {wishlistItem.type}
                      </div>
                    </div>
                    <div className="col-6 p-4 pb-0">
                      <h5 className="text-primary mb-3">₹{wishlistItem.price}</h5>
                      <a className="d-block h5 mb-2">
                        {wishlistItem.pname}
                      </a>
                      <p>
                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                        {wishlistItem.address}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(wishlistItem.pid)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="d-flex border-top">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-ruler-combined text-primary me-2"></i>
                        {wishlistItem.size} Sqft
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-bed text-primary me-2"></i>
                        {wishlistItem.bedrooms} Bed
                      </small>
                      <small className="flex-fill text-center py-2">
                        <i className="fa fa-bath text-primary me-2"></i>
                        {wishlistItem.bathrooms} Bath
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWishlist;
