
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Auth from './AuthSection'; 
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import NavSection from './NavSection';
import Usermanagement from './Usermanagement';
import Header from './Header';
import './App.css';

const App = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(sessionStorage.getItem('currentUser')) || null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('products', JSON.stringify(products));
    }, [users, products]);

    const handleLogin = (user) => {
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/dashboard");
    };

    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
        navigate("/auth");
    };

    return (
        <div className="app-container">
            <NavSection isLoggedIn={!!currentUser} handleLogout={handleLogout} />
            <div className="main-content">
                <Header currentUser={currentUser} />
                <main>
                    <Routes>
                        <Route 
                            path="/auth"
                            element={!currentUser ? (
                                <Auth 
                                    users={users}
                                    setUsers={setUsers}
                                    setCurrentUser={handleLogin} 
                                />
                            ) : (
                                <Navigate to="/dashboard" />
                            )}
                        />
                        <Route 
                            path="/dashboard"
                            element={currentUser ? (
                                <Dashboard 
                                    products={products}
                                    totalProducts={products.length}
                                    totalQuantity={products.reduce((total, product) => total + product.quantity, 0)}
                                    totalValue={products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}
                                />
                            ) : (
                                <Navigate to="/auth" />
                            )}
                        />
                        <Route 
                            path="/inventory"
                            element={currentUser ? (
                                <Inventory products={products} setProducts={setProducts} />
                            ) : (
                                <Navigate to="/auth" />
                            )}
                        />
                        <Route 
                            path="/usermanagement"
                            element={currentUser ? (
                                <Usermanagement 
                                    users={users} 
                                    setUsers={setUsers} 
                                    currentUser={currentUser} 
                                />
                            ) : (
                                <Navigate to="/auth" />
                            )}
                        />
                        <Route path="/" element={<Navigate to="/auth" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;