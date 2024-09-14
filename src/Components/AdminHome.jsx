import { Link } from "react-router-dom";
// import { FaShoppingBag } from "react-icons/fa"; // Optional: for adding an icon

let AdminHome = () => {
    return (
        <>
            <div
                style={{
                    backgroundImage: "url('https://wallpaperaccess.com/full/1597753.jpg')", // Use a relevant background image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '80px', marginBottom: '20px' }}>
                        Welcome to Shoe Store
                    </h1>
                    <h3 style={{ fontSize: '24px', marginBottom: '40px' }}>
                        Admin Access
                    </h3>
                    <Link
                        to="/loginsignup"
                        style={{
                            display: 'inline-block',
                            backgroundColor: '#ff5722', // Adjust color to your theme
                            color: '#fff',
                            padding: '15px 30px',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#433D8B'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#030637'}
                    >
                        Login or Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
