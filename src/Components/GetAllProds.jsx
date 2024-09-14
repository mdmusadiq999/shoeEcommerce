import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/GetAllProduct.css'; // Ensure you create and import this CSS file

const GetAllProds = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTableFormat, setIsTableFormat] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllProduct");
        if (response.headers['content-type'].includes('application/json')) {
          console.log("Products data:", response.data);
          setProducts(Array.isArray(response.data) ? response.data : []);
        } else {
          console.error("Expected JSON but received:", response.headers['content-type']);
          setError("Received unexpected response from server.");
        }
      } catch (error) {
        setError("Error fetching products. Please try again.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (product) => {
    navigate(`/updateProduct/${product.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted Successfully");
      const response = await axios.get("http://localhost:8080/getAllProduct");
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleDisplayFormat = () => {
    setIsTableFormat(!isTableFormat);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h1 className="my-5">All Products</h1>
        <button onClick={toggleDisplayFormat} className="btn btn-primary">
          {isTableFormat ? "Show Card Format" : "Show Table Format"}
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {isTableFormat ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Size</th>
              <th>Seller ID</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.image_link || "path/to/default-image.png"} // Use a default image if image_link is null
                    alt={product.pname}
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </td>
                <td>{product.pname}</td>
                <td><i className="fa fa-rupee"></i> {product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.size}</td>
                <td>{product.seller_id || "Not Assigned"}</td>
                <td>
                  <button onClick={() => handleClick(product)} className="btn btn-success">
                    <i className="fa fa-edit" aria-hidden="true"></i> Update
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger">
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="ag-format-container">
          <div className="ag-courses_box">
            {products.map((product) => (
              <div className="ag-courses_item" key={product.id}>
                <a href="#" className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>
                  <img
                    src={product.image_link || "path/to/default-image.png"} // Use a default image if image_link is null
                    alt={product.pname}
                    className="ag-courses-item_image"
                  />
                  <div className="ag-courses-item_title">ID : {product.id}</div>
                  <div className="ag-courses-item_title">{product.pname}</div>
                  <div className="ag-courses-item_date-box">
                    Price : <span className="ag-courses-item_date">
                      <i className="fa fa-rupee"></i> {product.price}
                    </span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    Brand : <span className="ag-courses-item_date">{product.brand}</span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    Category : <span className="ag-courses-item_date">{product.category}</span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    Size : <span className="ag-courses-item_date">{product.size}</span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    Seller ID : <span className="ag-courses-item_date">{product.seller_id || "Not Assigned"}</span>
                  </div>
                  <button onClick={() => handleClick(product)} className="btn btn-success mr-2">
                    <i className="fa fa-edit" aria-hidden="true"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger">
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllProds;
