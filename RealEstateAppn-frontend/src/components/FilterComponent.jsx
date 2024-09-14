import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const FilterComponent = ({ setProducts }) => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleFilter = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products', {
                params: { category, price }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error filtering products:', error);
        }
    };

    return (
        <Box className="filter-component" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
            />
            <TextField
                label="Price"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleFilter}>
                Apply Filters
            </Button>
        </Box>
    );
};

// Define PropTypes for your component
FilterComponent.propTypes = {
    setProducts: PropTypes.func.isRequired
};

export default FilterComponent;
