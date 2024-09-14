import  { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import { useWishlist } from "../WishlistContext";
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details. Please try again.");
        setLoading(false);
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleWishlistClick = async (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
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

        const res = await axios.post(`http://localhost:8080/${userId}/addSelectedProducts`, [product], {
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
        {loading && <p>Loading product details...</p>}
        {error && <p className="text-danger">{error}</p>}
        {product && (
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-6" style={{ width: 800 }} key={product.pid}>
              <div className="row product-item rounded overflow-hidden">
                <div className="col-6 position-relative overflow-hidden">
                  <img className="img-fluid" src={product.imageLink} alt="Product image" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                  <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{product.availability}</div>
                  <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{product.brand}</div>
                </div>
                <div className="col-6 p-4 pb-0">
                  <h5 className="text-primary mb-3">₹{product.price}</h5>
                  <h6 className="d-block h5 mb-2">{product.name}</h6>
                  <p>Size: {product.size}</p>
                  <p>Color: {product.color}</p>
                  <p>Material: {product.material}</p>
                  <button className={`btn btn-${isInWishlist(product.pid) ? 'outline-danger' : 'outline-primary'} btn-sm`} onClick={() => handleWishlistClick(product)}>
                    <i className="fa fa-heart me-2"></i>
                    {isInWishlist(product.pid) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
