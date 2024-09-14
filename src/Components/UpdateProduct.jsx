import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/UpdateProduct.css'; // Ensure this path is correct

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('productid:',id);

  const pnameRef = useRef();
  const priceRef = useRef();
  const imageLinkRef = useRef();
  const brandRef = useRef();
  const sizeRef = useRef();
  const sellerIdRef = useRef();

  const categoryRef = useRef(); // Added ref for category
  const [selectedCategory, setSelectedCategory] = useState('');

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      pnameRef.current.value = product.pname || '';
      priceRef.current.value = product.price || '';
      imageLinkRef.current.value = product.imageLink || '';
      brandRef.current.value = product.brand || '';
      sizeRef.current.value = product.size || '';
      sellerIdRef.current.value = product.sellerId || '';
      setSelectedCategory(product.category || '');
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const pname = pnameRef.current.value;
    const price = parseFloat(priceRef.current.value) || 0;
    const imageLink = imageLinkRef.current.value;
    const brand = brandRef.current.value;
    const size = parseFloat(sizeRef.current.value) || 0;
    const sellerId = parseInt(sellerIdRef.current.value) || 0;
    const category = categoryRef.current.value; // Get value from categoryRef
    const token = localStorage.getItem('token');

    if (!token) {
      alert("You need to login first");
      navigate("/loginsignup");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      await axios.put(`http://localhost:8080/update/${id}`, {
        pname,
        price,
        imageLink,
        brand,
        size,
        sellerId,
       category,
      }, {
        headers: headers,
      });
      alert("Update successful!");
      navigate("/body");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Update error:", error.response.data);
        alert(`Failed to update product: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert("Failed to update product: No response from server.");
      } else {
        // Something else happened
        console.error("Error:", error.message);
        alert(`Failed to update product: ${error.message}`);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleUpdate} className="update-product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" ref={pnameRef} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" ref={priceRef} required />
        </div>
        <div className="form-group">
          <label>Image Link</label>
          <input type="text" ref={imageLinkRef} required />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input type="text" ref={brandRef} required />
        </div>
        <div className="form-group">
          <label>Size</label>
          <input type="number" ref={sizeRef} required />
        </div>
        <div className="form-group">
          <label>Seller ID</label>
          <input type="number" ref={sellerIdRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            ref={categoryRef} // Use ref here
          >
            <option value="category">Select category</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Boots">Boots</option>
            <option value="Sandals">Sandals</option>
            <option value="Loafers">Loafers</option>
            <option value="Heels">Dress Shoes</option>
           
          </select>
        </div>

        <button type="submit" className="update-button">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
