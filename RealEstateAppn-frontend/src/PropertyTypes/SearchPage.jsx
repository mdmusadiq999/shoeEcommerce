import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWishlist } from "../WishlistContext";

const SearchPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleWishlistClick = async (property) => {
    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
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
      } catch (error) {
        console.error('Error adding to Wishlist:', error);
        alert('Failed to add to Wishlist. Please try again.');
      }
    }
  };

  return (
    <section>
      <div className="container h-100">
        {results.length > 0 ? (
          results.map((property) => (
            <div className="row d-flex justify-content-center" key={property.pid}>
              <div className="col-lg-4 col-md-6" style={{ width: 800 }}>
                <div className="row property-item rounded overflow-hidden">
                  <div className="col-6 position-relative overflow-hidden">
                    <Link to={`/product/${property.id}`}>
                      <img className="img-fluid" src={property.imageLink} alt="not available" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                    </Link>
                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.status}</div>
                    <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.type}</div>
                  </div>
                  <div className="col-6 p-4 pb-0">
                    <h5 className="text-primary mb-3">₹{property.price}</h5>
                    <a className="d-block h5 mb-2" href={property.link}>{property.pname}</a>
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {property.address}
                    </p>
                    <button className={`btn btn-${isInWishlist(property.id) ? 'outline-danger' : 'outline-primary'} btn-sm`} onClick={() => handleWishlistClick(property)}>
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
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
