import { useState } from "react";
import { Link } from "react-router-dom";
import GetAllProds from "./GetAllProds";
import UpdateAdmin from "./UpdateAdmin";
import DeleteAdmin from "./DeleteAdmin";
import AddProduct from "./AddProduct";
import AllUsers from "./AllUsers";
import Logout from "./Logout";
import { FaBox, FaPlus, FaEdit, FaTrash, FaUserCog, FaSignOutAlt } from "react-icons/fa"; // Icons

const Body = () => {
    const [activeContent, setActiveContent] = useState(null);

    const renderContent = (content) => {
        setActiveContent(content);
    };

    return (
        <div
            style={{
                backgroundImage: "url('https://wallpaperaccess.com/full/1597753.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                padding: '20px',
                color: '#fff',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center mb-4">
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>
                                <FaBox /> Admin Dashboard
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row text-center mb-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <Link
                                to="#"
                                className="btn btn-primary btn-lg"
                                onClick={() => renderContent("getAll")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaBox /> All Products
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-success btn-lg"
                                onClick={() => renderContent("addProduct")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaPlus /> Add Product
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-warning btn-lg"
                                onClick={() => renderContent("updateAdmin")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaEdit /> Update Admin
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-danger btn-lg"
                                onClick={() => renderContent("deleteAdmin")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaTrash /> Delete Admin
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-info btn-lg"
                                onClick={() => renderContent("allUsers")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaUserCog /> All Users
                            </Link>
                            <Link
                                to="#"
                                className="btn btn-dark btn-lg"
                                onClick={() => renderContent("logout")}
                                style={{ animation: 'fadeIn 0.5s ease' }}
                            >
                                <FaSignOutAlt /> Log Out
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {activeContent === "updateAdmin" && <UpdateAdmin />}
                    {activeContent === "deleteAdmin" && <DeleteAdmin />}
                    {activeContent === "getAll" && <GetAllProds />}
                    {activeContent === "addProduct" && <AddProduct />}
                    {activeContent === "allUsers" && <AllUsers />}
                    {activeContent === "logout" && <Logout />}
                </div>
            </div>
            <style>
                {`
                    .btn {
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    .btn:hover {
                        transform: scale(1.05);
                        background-color: #333;
                        color: #fff;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};

export default Body;
