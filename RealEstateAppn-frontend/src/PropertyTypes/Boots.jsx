import  { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Boots() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/boots');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching boots:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h2>Boots</h2>
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

export default Boots;
