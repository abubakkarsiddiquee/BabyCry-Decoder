const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD, // Use environment variable for DB password
  database: 'babyCry',
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the BabyCry API');
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, country, babyAge, dob, weight } = req.body;

  if (!name || !email || !password || !country || !babyAge || !dob || !weight) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.query(
        'INSERT INTO users (name, email, password, country, baby_age, dob, weight) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, country, babyAge, dob, weight],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to create user' });
          }

          return res.status(201).json({ message: 'Account created successfully!' });
        }
      );
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Don't send hashed password in response
    delete user.password;

    // Create a JWT token (expires in 1 hour)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // Use environment variable for secret
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token, // Send token in the response
      user: user,
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
