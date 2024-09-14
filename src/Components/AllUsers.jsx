import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt, FaHome } from "react-icons/fa"; // Optional: icons for table headers

let AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                let response = await axios.get(`http://localhost:8080/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', color: '#333', fontWeight: '700' }}>
                <FaUser /> All Users
            </h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th><FaUser /> Username</th>
                        <th><FaEnvelope /> Email</th>
                        <th><FaPhoneAlt /> Mobile</th>
                        <th><FaHome /> Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers;
