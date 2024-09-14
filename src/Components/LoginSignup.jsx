import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../assets/LoginSingup.css';

const LoginSignup = () => {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const otpRef = useRef(null);
    const resetEmailRef = useRef(null);
    const navigate = useNavigate();

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [emailForOtp, setEmailForOtp] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            console.error('Email and password are required.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/auth', { email, password });
            const { token, userId, mailId } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('mailId', mailId);

            emailRef.current.value = '';
            passwordRef.current.value = '';

            navigate("/Body"); // Redirect to homepage after login
        } catch (error) {
            console.error('Login error:', error);
            alert("Login failed: invalid credentials");
        }
    };

    const toggleForms = () => {
        setShowLoginForm(!showLoginForm);
        setIsOtpSent(false);
        setShowForgotPasswordForm(false);
    };

    const toggleForgotPasswordForm = () => {
        setShowForgotPasswordForm(!showForgotPasswordForm);
        setShowLoginForm(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const mobile = mobileRef.current?.value;
        const address = addressRef.current?.value;

        const passwordRegex = /^[A-Za-z\d]{8,}$/;
        const mobileRegex = /^\d{10}$/;
        const usernameregex = /^(?=.*[A-Za-z])[A-Za-z\s]{6,}$/;

        if (!username || !email || !password || !mobile || !address) {
            alert('All fields are required.');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("Password should contain at least 8 characters with letters and digits.");
            return;
        }

        if (!mobileRegex.test(mobile)) {
            alert("Mobile number should contain exactly 10 digits.");
            return;
        }

        if (!usernameregex.test(username)) {
            alert("Username must contain at least 6 alphabetical characters.");
            return;
        }

        try {
            await axios.post('http://localhost:8080/init-reg', {
                username,
                email,
                password,
                mobile,
                address,
                roles: selectedRoles
            });

            alert("OTP has been sent to your email. Please enter the OTP to complete the registration.");
            setIsOtpSent(true);
            setEmailForOtp(email);

            usernameRef.current.value = '';
            passwordRef.current.value = '';
            mobileRef.current.value = '';
            addressRef.current.value = '';
            emailRef.current.value = '';
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response) {
                const { data } = error.response;
                alert(data || 'Registration failed. Please try again.');
            } else {
                alert('Registration failed. Please check your internet connection and try again.');
            }
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        const otp = otpRef.current?.value;

        if (!otp) {
            alert('OTP is required.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', { email: emailForOtp, otp });

            alert("Registration successful!!");
            navigate("/loginsignup");
            setShowLoginForm(true);
            setIsOtpSent(false);
        } catch (error) {
            console.error('OTP Verification error:', error);

            if (error.response) {
                const { data } = error.response;
                alert(data || 'OTP verification failed. Please try again.');
            } else {
                alert('OTP verification failed. Please check your internet connection and try again.');
            }
        }
    };

    const handleRoleChange = (e) => {
        const roleName = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedRoles([...selectedRoles, roleName]);
        } else {
            setSelectedRoles(selectedRoles.filter(role => role !== roleName));
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        const resetEmail = resetEmailRef.current?.value;

        if (!resetEmail) {
            alert('Email is required.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/reset-password', { email: resetEmail });
            alert('Password reset link has been sent to your email.');
            setShowForgotPasswordForm(false);
            setShowLoginForm(true);
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Failed to send password reset link. Please try again.');
        }
    };


    return (
        <section className="login-signup-section">
            <div className="login-signup-container">
                <div className="login-signup-row">
                    <div className="login-signup-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="title">Shoe Store</h1>
                                {!showForgotPasswordForm && (
                                    <button className="btn toggle-button" onClick={toggleForms}>
                                        {showLoginForm ? <h5>Register</h5> : <h5>Login</h5>}
                                    </button>
                                )}
                            </div>

                            {isOtpSent ? (
                                <form onSubmit={handleOtpVerification}>
                                    <h4>OTP Verification</h4>
                                    <div className="mb-3">
                                        <label htmlFor="otpInput" className="form-label">OTP</label>
                                        <input type="text" className="form-control" id="otpInput" ref={otpRef} placeholder="Enter OTP" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Verify OTP</button>
                                </form>
                            ) : showForgotPasswordForm ? (
                                <form onSubmit={handlePasswordReset}>
                                    <h4>Forgot Password</h4>
                                    <div className="mb-3">
                                        <label htmlFor="resetEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="resetEmail" ref={resetEmailRef} placeholder="Enter your email" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send Reset Link</button>
                                    <p className="mt-3"><Link to="#" onClick={toggleForgotPasswordForm} className="link">Back to Login</Link></p>
                                </form>
                            ) : showLoginForm ? (
                                <form onSubmit={handleLogin}>
                                    <h4>Login</h4>
                                    <div className="mb-3">
                                        <label htmlFor="loginEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="loginEmail" ref={emailRef} placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="loginPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="loginPassword" ref={passwordRef} placeholder="Enter password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <p className="mt-3"><Link to="#" onClick={toggleForgotPasswordForm} className="link">Forgot Password?</Link></p>
                                    <p className="mt-3">Dont have an account? <Link to="#" onClick={toggleForms} className="link">Register here</Link></p>
                                </form>
                            ) : (
                                <form onSubmit={handleRegister}>
                                    <h4>Register</h4>
                                    <div className="mb-1">
                                        <label htmlFor="registerUsername" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="registerUsername" ref={usernameRef} placeholder="Enter your username" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="registerEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="registerEmail" ref={emailRef} placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="registerPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="registerPassword" ref={passwordRef} placeholder="Enter your password" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="registerMobile" className="form-label">Mobile</label>
                                        <input type="text" className="form-control" id="registerMobile" ref={mobileRef} placeholder="Enter your mobile number" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="registerAddress" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="registerAddress" ref={addressRef} placeholder="Enter your address" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="roles" className="form-label">Roles</label><br />
                                        <label className="role-checkbox"><input type="checkbox" value="ROLE_ADMIN" onChange={handleRoleChange} />Admin</label>
                                        <label className="role-checkbox"><input type="checkbox" value="ROLE_SELLER" onChange={handleRoleChange} />Seller</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <p className="mt-1">Already have an account? <Link to="#" onClick={toggleForms} className="link">Login here</Link></p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginSignup;
