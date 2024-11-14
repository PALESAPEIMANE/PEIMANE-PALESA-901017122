const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '123456',
    database: 'my_database' 
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});


app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to create user' });
        }
        return res.status(201).json({ id: results.insertId, username });
    });
});


app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch users' });
        }
        return res.json(results);
    });
});


app.post('/api/products', (req, res) => {
    const { name, description, category, price, quantity, userId } = req.body;
    db.query('INSERT INTO products (name, description, category, price, quantity, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, category, price, quantity, userId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to create product' });
            }
            return res.status(201).json({ id: results.insertId, name });
        });
});


app.put('/api/products/:id', (req, res) => {
    const { quantity } = req.body;
    const productId = req.params.id;
    db.query('UPDATE products SET quantity = quantity + ? WHERE id = ?', [quantity, productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update product quantity' });
        }
        return res.json({ message: 'Product quantity updated successfully' });
    });
});


app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch products' });
        }
        return res.json(results);
    });
});


app.get('/api/products/user/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM products WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch products for user' });
        }
        return res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});