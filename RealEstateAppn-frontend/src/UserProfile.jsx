import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) {
        alert("You need to login to access your profile!");
        navigate("/loginsignup");
        return; 
      }
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUserData(res.data);
        console.log("User data fetched:", res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert("Your account have been deleted successfully");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <div className="container mt-5 col-5">
      <h2 className="text-center" style={{ fontFamily: 'Consolas', color: 'green' }}>User Profile</h2>
      <div className="card">
        <div className="card-body">
          {userData && (
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <p>
                    <strong>Username:</strong> {userData.username}
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong>Mobile:</strong> {userData.mobile}
                  </p>
                </div>
                <div className="mb-3">
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                </div>
              </div>
              <div className="d-flex  justify-content-between">
                <Link to="/orders" className="btn btn-outline-primary mb-2">
                  Wishlist
                </Link>
                <Link to="/update-profile" className="btn btn-outline-info mb-2" >
                  Update Profile
                </Link>
                <button className="btn btn-outline-danger mb-2" onClick={handleDelete}>Delete Account</button> 
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
