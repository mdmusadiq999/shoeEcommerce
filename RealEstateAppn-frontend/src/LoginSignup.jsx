import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../public/assets/LoginSingup.css';

const LoginSignup = () => {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const mobileRef = useRef(null);
    const addressRef = useRef(null);
    const otpRef = useRef(null);
    const resetEmailRef = useRef(null);
    const newPasswordRef = useRef(null); // Added reference for the new password
    const resetOtpRef = useRef(null); // Added reference for the reset OTP
    const navigate = useNavigate();

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false); // Added state for reset password form
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [emailForOtp, setEmailForOtp] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

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
        setShowResetPasswordForm(false);
    };

    const toggleForgotPasswordForm = () => {
        setShowForgotPasswordForm(!showForgotPasswordForm);
        setShowLoginForm(false);
        setShowResetPasswordForm(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const mobile = mobileRef.current.value;
        const address = addressRef.current.value;

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

        const otp = otpRef.current.value;

        if (!otp) {
            alert('OTP is required.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', { email: emailForOtp, otp });

            alert("Registration successful!!");
            navigate("/login");
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

        const resetEmail = resetEmailRef.current.value;

        if (!resetEmail) {
            alert('Email is required.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/forgot-password', { email: resetEmail });

            alert('OTP for password reset has been sent to your email.');
            setShowForgotPasswordForm(false);
            setShowResetPasswordForm(true); // Show the reset password form
            setEmailForOtp(resetEmail); // Save the email for use in reset form
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data); // Display backend error message
            } else {
                alert('Password reset failed. Please try again.');
            }
            console.error('Password reset error:', error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!resetEmailRef.current) {
            console.log('resetEmailRef.current:', resetEmailRef.current);
            alert('Reset email reference is not available.');
            return;
        }

        const resetEmail = resetEmailRef.current.value;

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
            if (error.response) {
                const { status, data } = error.response;
                if (status === 403) {
                    alert('Access forbidden: Your request was denied.');
                } else if (status === 400) {
                    alert('Bad request: Please check the entered details.');
                } else {
                    alert('Password reset failed: ' + (data || 'Unexpected error occurred.'));
                }
            } else {
                alert('Network error: Please check your connection and try again.');
            }
            console.error('Password reset error:', error);
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
                                {!showForgotPasswordForm && !showResetPasswordForm && (
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
                                    <button type="submit" className="btn btn-primary">Send OTP</button>
                                </form>
                            ) : showResetPasswordForm ? (
                                <form onSubmit={handleResetPassword}>
                                    <h4>Reset Password</h4>
                                    <div className="mb-3">
                                        <label htmlFor="resetOtp" className="form-label">OTP</label>
                                        <input type="text" className="form-control" id="resetOtp" ref={resetOtpRef} placeholder="Enter OTP" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input type="password" className="form-control" id="newPassword" ref={newPasswordRef} placeholder="Enter new password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Reset Password</button>
                                </form>
                            ) : showLoginForm ? (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="emailInput" ref={emailRef} placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="passwordInput" ref={passwordRef} placeholder="Enter your password" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                        <button type="button" className="btn btn-link" onClick={toggleForgotPasswordForm}>
                                            Forgot Password?
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label htmlFor="usernameInput" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="usernameInput" ref={usernameRef} placeholder="Enter your username" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="emailInput" ref={emailRef} placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="passwordInput" ref={passwordRef} placeholder="Enter your password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobileInput" className="form-label">Mobile</label>
                                        <input type="text" className="form-control" id="mobileInput" ref={mobileRef} placeholder="Enter your mobile number" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addressInput" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="addressInput" ref={addressRef} placeholder="Enter your address" />
                                    </div>
                                    <div className="mb-3">
                                        <h6>Roles:</h6>
                                        <label className="form-check-label">
                                            <input type="checkbox" value="USER" onChange={handleRoleChange} /> User
                                        </label>
                                        <label className="form-check-label">
                                            <input type="checkbox" value="ADMIN" onChange={handleRoleChange} /> Admin
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginSignup;
