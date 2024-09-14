import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Optional: icon for delete action

const DeleteAdmin = () => {
    const adminIdRef = useRef(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        alert("You need to login first");
        navigate("/loginsignup");
        return;
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        const userId = adminIdRef.current.value;

        try {
            let response = await axios.delete(`http://localhost:8080/deleteUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });

            adminIdRef.current.value = '';

            console.log("Admin deleted", response.data);
            alert("Admin deleted successfully!!");
            navigate("/body");

        } catch (error) {
            alert(error.message || "An error occurred while deleting the admin");
            console.error("Delete error:", error);
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
                color: '#000', // Set text color to black
            }}
        >
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="bg-light p-4 rounded shadow" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <h2 className="text-center mb-4">
                                <FaTrash /> Delete Admin
                            </h2>
                            <form onSubmit={handleDelete}>
                                <div className="mb-3">
                                    <label htmlFor="adminId" className="form-label">Enter Admin Id to Delete</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="adminId"
                                        ref={adminIdRef}
                                        placeholder="Enter admin ID"
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
                        color: #fff; /* Ensure text color is white for contrast */
                    }
                    .btn-danger:hover {
                        background-color: #c51b2c;
                        transform: scale(1.05);
                    }
                    .bg-light {
                        background-color: rgba(255, 255, 255, 0.8) !important;
                    }
                    .form-control {
                        background-color: rgba(255, 255, 255, 0.9);
                        color: #000; /* Black text color for input fields */
                    }
                `}
            </style>
        </div>
    )
}

export default DeleteAdmin;
