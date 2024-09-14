import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        alert('You have been logged out');
        navigate("/loginsignup");
    }, [navigate]);

    return null; 
}

export default Logout;
