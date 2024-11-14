import React from 'react';
import ProductChart from './ProductChart.jsx';
import './App.css'; 

const Dashboard = ({ products, totalProducts, totalQuantity }) => {
    
    
    const calculateTotalValue = (products) => {
        return products.reduce((acc, product) => {
            const productValue = (typeof product.price === 'number' && !isNaN(product.price)) ? product.price * (product.quantity || 0) : 0;
            return acc + productValue;
        }, 0);
    };

    
    const totalValue = calculateTotalValue(products);

    const formatValue = (value) => {
        return typeof value === 'number' && !isNaN(value) ? value.toFixed(2) : '0.00';
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Products: {totalProducts}</p>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Value: R{formatValue(totalValue)}</p>

            {products.length > 0 ? (
                <ProductChart products={products} />
            ) : (
                <p>No data available for chart.</p>
            )}

            {/* Include the rotating images here, under the ProductChart */}
            <div className="image-rotation-container">
                <img src="/VEG1.jpeg" alt="First Vegetable" className="rotating-image" style={{ width: '150px', height: 'auto' }} />
                <img src="/VEG2.jpg" alt="Second Vegetable" className="rotating-image" style={{ width: '150px', height: 'auto' }} />
            </div>

            <h3>Product List</h3>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black' }}>Name</th>
                            <th style={{ border: '2px solid black' }}>Description</th>
                            <th style={{ border: '2px solid black' }}>Category</th>
                            <th style={{ border: '2px solid black' }}>Price (R)</th> {/* Added label for Price */}
                            <th style={{ border: '2px solid black' }}>Quantity (Units)</th> {/* Added label for Quantity */}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id || product.name}>
                                <td style={{ border: '2px solid black' }}>{product.name}</td>
                                <td style={{ border: '2px solid black' }}>{product.description}</td>
                                <td style={{ border: '2px solid black' }}>{product.category}</td>
                                <td style={{ border: '2px solid black' }}>R{formatValue(product.price)}</td>
                                <td style={{ border: '2px solid black' }}>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;