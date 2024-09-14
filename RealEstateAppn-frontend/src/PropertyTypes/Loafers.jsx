import  { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Loafers() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/loafers');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching loafers:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h2>Loafers</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loafers;
