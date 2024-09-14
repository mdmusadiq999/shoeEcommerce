import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { useWishlist } from "../WishlistContext";

const Villa=()=>{
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:8080/category/Villa', {
            });
            setProperties(response.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching properties. Please try again.");
            setLoading(false);
            console.error("Error fetching properties:", error);
        }
        };

        fetchProperties();
    }, []);
    
    const handleWishlistClick =async (property) => {
        if (isInWishlist(property.pid)) {
          removeFromWishlist(property.pid);
        } else {
          addToWishlist(property);
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
    
            const res = await axios.post(`http://localhost:8080/${userId}/addSelectedProducts`, [property], {
              headers: headers,
            });
            console.log(res.data);
            // alert('Add to Wishlsit!');
          }catch(error){
            console.error('Error making to add Wishlist:', error);
            alert('failed to add to Wishlist . Please try again.');
          }
        }
    };

        return(
            <>
            <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-4">
                {loading && <p>Loading properties...</p>}
                {error && <p className="text-danger">{error}</p>}
                {properties.map((property) => (
                    <div className="col-lg-4 col-md-6" key={property.id}>
                    <div className="property-item rounded overflow-hidden">
                        <div className="position-relative overflow-hidden">
                        <Link to={`/product/${property.pid}`}>
                            <img className="img-fluid" src={property.imageLink} alt="not available"/>
                        </Link>
                        <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                            {property.status}
                        </div>
                        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                            {property.type}
                        </div>
                        </div>
                        <div className="p-4 pb-0">
                        <h5 className="text-primary mb-3">₹{property.price}</h5>
                        <a className="d-block h5 mb-2" href={property.link}>
                            {property.pname}
                        </a>
                        <p>
                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                            {property.address}
                        </p>
                        <button className={`btn btn-${isInWishlist(property.pid) ? 'outline-danger' : 'outline-primary'} btn-sm`} onClick={() => handleWishlistClick(property)}>
                            <i className="fa fa-heart me-2"></i>
                            {isInWishlist(property.pid) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                        </div>
                        <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-ruler-combined text-primary me-2"></i>
                            {property.size} Sqft
                        </small>
                        <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-bed text-primary me-2"></i>
                            {property.bedrooms} Bed
                        </small>
                        <small className="flex-fill text-center py-2">
                            <i className="fa fa-bath text-primary me-2"></i>
                            {property.bathrooms} Bath
                        </small>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    )
}
export default Villa;