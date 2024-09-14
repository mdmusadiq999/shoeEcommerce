import React, { useRef,useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/user/${userId}`, {
                    headers: {
                        Authorization:`Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setUserData(res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const mobile = mobileRef.current.value;
        const address = addressRef.current.value;
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!token) {
            alert("You need to login first");
            navigate("/loginsignup");
            return;
        }

        const mobileRegex = /^\d{10}$/;

        const usernameregex = /^(?=.*[A-Za-z])[A-Za-z\s]{6,}$/;


        if (!mobileRegex.test(mobile)) {
            alert("Mobile number should contain exactly 10 digits.");
            return;
        }

        if(!usernameregex.test(username)){
            alert("Username must contain atleat 6 alphabetical characters");
            return;
        }

        if(password!=""){
            const passwordRegex = /^(?=.[A-Za-z])(?=.[@#$])[A-Za-z\d@$#]{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("Password should contain at least 8 characters with one special character of @, #, or $.");
                return;
            }
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        console.log('Submitting updation');

        try {
            const res = await axios.put(`http://localhost:8080/updateUser/${userId}`, {
                username,
                email,
                password,
                mobile,
                address
            },
                {
                    headers: headers,
                }
            );

            usernameRef.current.value = '';
            mobileRef.current.value = '';
            passwordRef.current.value = '';
            addressRef.current.value = '';
            emailRef.current.value = '';

            console.log('Updation successful:', res.data);
            alert("Updation successful!!");
            navigate("/user/accountsettings");

        } catch (error) {
            console.error('Update error:', error);
            if (error.response) {
                const { data } = error.response;
                if (data) {
                    alert(data);
                } else {
                    alert('Registration failed. Please try again.');
                }
            } else {
                alert('Registration failed. Please check your internet connection and try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">Update Profile</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputName1" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="exampleInputName1" ref={usernameRef} defaultValue={userData?.username} placeholder="Enter username" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail2" ref={emailRef} defaultValue={userData?.email} placeholder="Enter email" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword2" ref={passwordRef}  placeholder="Enter new password" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
                                    <input type="text" className="form-control" id="exampleInputMobile" ref={mobileRef} defaultValue={userData?.mobile} placeholder="Enter mobile number" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="exampleInputAddress" ref={addressRef} defaultValue={userData?.address} placeholder="Enter address" />
                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;