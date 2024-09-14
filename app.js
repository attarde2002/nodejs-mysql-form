// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the static HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',   // Change to your MySQL username
    password: '',   // Change to your MySQL password
    database: 'form_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        console.log('Data inserted:', result);

        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
