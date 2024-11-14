import React, { useState, useEffect } from 'react';

const UserManagement = () => {
   
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(savedUsers);
    }, []);

    const handleAddOrUpdateUser = () => {
        if (!username || !password) {
            alert("Both username and password are required");
            return;
        }

        if (editUserId) {
           
            const updatedUsers = users.map(user => 
                user.id === editUserId ? { ...user, username, password } : user
            );
            setUsers(updatedUsers);
            setEditUserId(null); 
        } else {
           
            const newUser = { id: Date.now(), username, password }; 
            setUsers([...users, newUser]);
        }

       
        setUsername('');
        setPassword('');
        localStorage.setItem('users', JSON.stringify(users));
    };

    const handleDeleteUser = (id) => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
        localStorage.setItem('users', JSON.stringify(filteredUsers)); 
    };

    const handleEditUser = (user) => {
        setUsername(user.username);
        setPassword(user.password);
        setEditUserId(user.id);
    };

    return (
        <div>
            <h2>User Management</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAddOrUpdateUser}>
                {editUserId ? 'Update User' : 'Add User'}
            </button>

            <h3>Users List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} 
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;