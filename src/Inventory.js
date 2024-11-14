import React, { useState } from 'react';

const Inventory = ({ products, setProducts }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [editIndex, setEditIndex] = useState(null); // To track which product is being edited

    const handleAddOrUpdateProduct = (e) => {
        e.preventDefault();

        const newProduct = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10)
        };

        if (editIndex !== null) {
            // Update the existing product
            const updatedProducts = products.map((product, index) =>
                index === editIndex ? newProduct : product
            );
            setProducts(updatedProducts);
            setEditIndex(null); // Reset edit index
        } else {
            // Add a new product
            setProducts([...products, newProduct]);
        }

        // Clear the input fields
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
    };

    const handleEditProduct = (index) => {
        const productToEdit = products[index];
        setProductName(productToEdit.name);
        setProductPrice(productToEdit.price);
        setProductQuantity(productToEdit.quantity);
        setEditIndex(index); // Set the index of the product being edited
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const handleSellProduct = (index) => {
        const updatedProducts = products.map((product, i) => {
            if (i === index) {
                return { ...product, quantity: Math.max(0, product.quantity - 1) }; // Ensure quantity doesn't go below 0
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    return (
        <div>
            <h2>Inventory</h2>
            <form onSubmit={handleAddOrUpdateProduct}>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    placeholder="Quantity"
                    required
                />
                <button type="submit">{editIndex !== null ? "Update Product" : "Add Product"}</button>
            </form>

            <h3>Products List:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>R{product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => handleEditProduct(index)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                                <button onClick={() => handleSellProduct(index)} disabled={product.quantity === 0}>Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;