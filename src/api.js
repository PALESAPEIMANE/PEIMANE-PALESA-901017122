import axios from 'axios';


const API_URL = 'http://localhost:5000/api';


const getUsers = () => {
    return axios.get(`${API_URL}/users`);
};


const createUser = (userData) => {
    return axios.post(`${API_URL}/users`, userData);
};


const deleteUser = (userId) => {
    return axios.delete(`${API_URL}/users/${userId}`);
};


const getInventory = () => {
    return axios.get(`${API_URL}/products`);
};


const createProduct = (productData) => {
    return axios.post(`${API_URL}/products`, productData);
};


const updateProductStock = (productId, stockData) => {
    return axios.put(`${API_URL}/products/${productId}`, stockData);
};

export {
    getUsers,
    createUser,
    deleteUser,
    getInventory,
    createProduct,
    updateProductStock,
};