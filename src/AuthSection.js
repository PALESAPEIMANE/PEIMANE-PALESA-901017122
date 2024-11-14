
import React, { useState } from 'react';

const AuthSection = ({ users, setUsers, setCurrentUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (isSignUpMode) {
            
            const existingUser = users.find(user => user.name === username);
            if (existingUser) {
                setErrorMessage('User already exists. Please log in.');
                return;
            }
            const newUser = { id: Date.now(), name: username, password: password };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setUsername('');
            setPassword('');
            setErrorMessage('Successfully registered! You can now log in.');
        } else {
            
            const loggedInUser = users.find(user => user.name === username && user.password === password);
            if (loggedInUser) {
                setCurrentUser(loggedInUser);
                setUsername('');
                setPassword('');
            } else {
                setErrorMessage('Invalid username or password.');
            }
        }
    };

    return (
        <div>
            <h2>{isSignUpMode ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUpMode ? 'Sign Up' : 'Login'}</button>
                <p>{errorMessage}</p>
            </form>
            <button onClick={() => setIsSignUpMode(prevMode => !prevMode)}>
                {isSignUpMode ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>
        </div>
    );
};

export default AuthSection;