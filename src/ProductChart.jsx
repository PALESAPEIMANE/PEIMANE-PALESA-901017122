
import React from 'react';
import PropTypes from 'prop-types'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProductChart = ({ products }) => {
    
    if (!products || products.length === 0) {
        return <div>No product data available to display.</div>;
    }

    
    const labels = products.map(product => product.name);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Quantity',
                data: products.map(product => product.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Price',
                data: products.map(product => product.price),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product Chart',
            },
        },
    };

    return (
        <div>
            <Bar data={data} options={options} aria-label="Product data bar chart" />
        </div>
    );
};

ProductChart.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ProductChart;