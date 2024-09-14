import  { useState, useEffect } from 'react';
import FilterComponent from './FilterComponent'; // Ensure the path is correct
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Initial fetch to get all products or some default products
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <FilterComponent setProducts={setProducts} />
            {/* Render products here */}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="product-item">
                            {/* Render your product details here */}
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            {/* Add more product details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
