import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, navigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
    CircularProgress,
    Alert
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from "../WishlistContext";

const Shop = () => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/Shop');
                setProperties(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching properties. Please try again.");
                setLoading(false);
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    const handleWishlistClick = async (property) => {
        if (isInWishlist(property.pid)) {
            removeFromWishlist(property.pid);
        } else {
            addToWishlist(property);
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const userEmail = localStorage.getItem('mailId');

                if (!userId || !token || !userEmail) {
                    navigate('/loginSignup');
                    return;
                }

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const res = await axios.post(`http://localhost:8080/${userId}/addSelectedProducts`, [property], { headers });
                console.log(res.data);
            } catch (error) {
                console.error('Error adding to Wishlist:', error);
                alert('Failed to add to Wishlist. Please try again.');
            }
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 5 }}>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={4}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} key={property.pid}>
                        <Card>
                            <Link to={`/product/${property.pid}`}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={property.imageLink}
                                    alt="Product Image"
                                />
                            </Link>
                            <CardContent>
                                <Typography variant="h5" color="primary">
                                    ₹{property.price}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {property.pname}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {property.address}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleWishlistClick(property)} color={isInWishlist(property.pid) ? "error" : "primary"}>
                                    {isInWishlist(property.pid) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                                <Button size="small" color="primary">
                                    {property.status}
                                </Button>
                                <Typography variant="body2" color="textSecondary">
                                    {property.type}
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Shop;
