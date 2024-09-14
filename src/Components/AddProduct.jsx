import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/AddProduct.css';

const AddProduct = () => {
  const pnameRef = useRef(null);
  const priceRef = useRef(null);
  const [images, setImages] = useState([""]);
  const categoryRef = useRef(null);
  const sizeRef = useRef(null);

  const brandRef = useRef(null);

  const sellerIdRef = useRef(null);


  const [selectedCategory, setSelectedCategory] = useState("");


  const navigate = useNavigate();
  const handleAdd = async (e) => {
    e.preventDefault();

    // Safe access to ref values
    const pname = pnameRef.current?.value.trim();
    const price = parseFloat(priceRef.current?.value);
    const size = parseFloat(sizeRef.current?.value);
    const category = selectedCategory;
    const brand = brandRef.current?.value.trim();
    const sellerId = parseInt(sellerIdRef.current?.value, 10);

    // Validation checks
    if (!pname || isNaN(price) || isNaN(size) || isNaN(sellerId) || !category || !brand) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const token = localStorage.getItem("token");

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
      const response = await axios.post(
        'http://localhost:8080/add',
        {
          pname,
          price,
          imageLink: images[0],
          category,
          brand,
          size,
          sellerId,
        },
        { headers }
      );

      // Clear the form after successful addition
      pnameRef.current.value = "";
      priceRef.current.value = "";
      sizeRef.current.value = "";
      setImages([""]);
      setSelectedCategory("");
      brandRef.current.value = "";
      sellerIdRef.current.value = "";

      console.log("Shoe added successfully", response.data);
      alert("Addition successful!");
      navigate("/body");
    } catch (error) {
      console.error("Adding error:", error.response?.data?.message || error.message);
      alert("Error adding shoe. Please check console for details.");
    }
  };

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
 

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, ""]);

  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="row">
      <div className="container mt-5 col-4 px-4 py-3 add-product-container">
        <form onSubmit={handleAdd}>
          <h4>Add Shoe</h4>

          {/* Form Fields */}
          {[
            { id: "productName", label: "Product Name", type: "text", ref: pnameRef, placeholder: "Enter product name" },
            { id: "price", label: "Price", type: "number", ref: priceRef, placeholder: "Enter price" },
            { id: "size", label: "Size", type: "number", ref: sizeRef, placeholder: "Enter size" },
            { id: "brand", labe:"brand", type:"text", ref:brandRef, placeholder :"Enter Brand"},
            { id: "sellerId", label: "Seller ID", type: "number", ref: sellerIdRef, placeholder: "Enter seller ID" },
          
          ].map(field => (
            <div key={field.id} className="mb-3">
              <label htmlFor={field.id} className="form-label">{field.label}</label>
              <input
                type={field.type}
                className="form-control"
                id={field.id}
                ref={field.ref}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                min={field.min}
                max={field.max}
              />
            </div>
          ))}

          {/* Images */}
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images</label>
            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e)}
                />
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => removeImageField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addImageField}
            >
              Add Another Image
            </button>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              ref={categoryRef}
            >
              <option value="category">Select category</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Boots">Boots</option>
              <option value="Sandals">Sandals</option>
              <option value="Loafers">Loafers</option>
              <option value="Heels">Heels</option>
              
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Shoe</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
