
import React from 'react';
import { Link } from 'react-router-dom';

const NavSection = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="nav">
            <ul>
                
                {/* Include links only if the user is logged in */}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/inventory">Inventory</Link>
                        </li>
                        <li>
                            <Link to="/usermanagement">User Management</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavSection;