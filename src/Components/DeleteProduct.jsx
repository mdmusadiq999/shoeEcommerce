import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Optional: icon for delete action

const DeleteProduct = () => {
    const prodIdRef = useRef(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Check if the user is logged in
    if (!token) {
        alert("You need to login first");
        navigate("/loginsignup");
        return null; // Return null to prevent rendering the component
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const id = prodIdRef.current.value;

        if (!id) {
            alert("Product ID cannot be empty");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/deleteProduct/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });

            prodIdRef.current.value = '';

            console.log("Product deleted", response.data);
            alert("Product deleted successfully!!");
            navigate("/body");

        } catch (error) {
            console.error("Delete error:", error);
            alert(`Error deleting product: ${error.response?.data?.message || error.message}`);
        }
    }

    return (
        <div
            style={{
                backgroundImage: "url('https://example.com/path/to/shoe-background-image.jpg')", // Update with actual image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                color: '#fff',
            }}
        >
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 rounded shadow">
                            <h2 className="text-center mb-4">
                                <FaTrash /> Delete Product
                            </h2>
                            <form onSubmit={handleDelete}>
                                <div className="mb-3">
                                    <label htmlFor="productId" className="form-label">Enter Product ID to Delete</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productId"
                                        ref={prodIdRef}
                                        placeholder="Enter product ID"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger w-100"
                                    style={{ transition: 'background-color 0.3s, transform 0.3s' }}
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                    .btn-danger {
                        background-color: #e3342f;
                        border: none;
                    }
                    .btn-danger:hover {
                        background-color: #c51b2c;
                        transform: scale(1.05);
                    }
                    .bg-light {
                        background-color: #f8f9fa !important;
                    }
                `}
            </style>
        </div>
    );
}

export default DeleteProduct;
