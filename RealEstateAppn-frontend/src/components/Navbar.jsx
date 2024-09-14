import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../WishlistContext';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu'; // Corrected import
import AccountCircle from '@mui/icons-material/AccountCircle';
import  '../../public/assets/Navbar.css';

function Navbar() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        document.querySelector('.nav-bar').classList.add('sticky-top');
      } else {
        document.querySelector('.nav-bar').classList.remove('sticky-top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category/{category}');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out successfully!");
    navigate("/loginsignup"); // Redirect to login/signup page after logout
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" className="nav-bar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Shoe Store
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            Shop
          </Button>
          <Button color="inherit" onClick={handleMenuOpen}>
            Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                component={Link}
                to={`/category/${category.name}`}
                onClick={handleMenuClose}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="account"
            onClick={handleProfileMenuOpen}
          >
            <Badge badgeContent={wishlist.length} color="error">
              <AccountCircle />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            {isLoggedIn ? (
              <>
                <MenuItem component={Link} to="/user/accountsettings">Profile</MenuItem>
                <MenuItem component={Link} to="/wishlist">Wishlist</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/loginsignup">Login/Sign Up</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
