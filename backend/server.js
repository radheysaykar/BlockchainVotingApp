// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mysql'
});

connection.connect((err) => { 
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Allow requests from all origins
app.use(cors());

// Route for fetching phone number based on Aadhaar number
app.get('/getPhoneNumber', (req, res) => {
  const { aadhaarNumber } = req.query;

  const query = `SELECT phone_number FROM users WHERE aadhaar_number = ?`;
  connection.query(query, [aadhaarNumber], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Phone number not found for the provided Aadhaar number' });
      return;
    }

    const phoneNumber = results[0].phone_number;
    res.json({ phoneNumber });
  });
});

app.get('/api/voters', (req, res) => {
  // Query to fetch all voters from the users table
  const query = 'SELECT * FROM users';

  // Execute the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching voters:', error);
      res.status(500).json({ error: 'Error fetching voters' });
    } else {
      res.json(results);
    }
  });
});


// Route for adding a new user to the users table
app.post('/addUser', (req, res) => {
  const { aadhaarNumber, name, dob, phoneNumber } = req.body;

  // Perform basic input validation
  if (!aadhaarNumber || !name || !dob || !phoneNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO users (aadhaar_number, name, dob, phone_number) VALUES (?, ?, ?, ?)`;
  connection.query(query, [aadhaarNumber, name, dob, phoneNumber], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'User added successfully' });
  });
});

// // Dummy database of users
// const users = [];

// // Endpoint to register a new user
// app.post('/register', async (req, res) => {
//   try {
//     // Extract username and password from request body
//     const { username, password } = req.body;

//     // Check if username already exists
//     if (users.find(user => user.username === username)) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

//     // Store the username and hashed password in the database
//     users.push({ username, password: hashedPassword });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Endpoint to login
// app.post('/login', async (req, res) => {
//   try {
//     // Extract username and password from request body
//     const { username, password } = req.body;

//     // Find the user in the database
//     const user = users.find(user => user.username === username);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if username already exists
    const query = 'SELECT * FROM admins WHERE username = ?';
    connection.query(query, [username], async (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Insert user information into the database
      const insertQuery = 'INSERT INTO admins (username, password) VALUES (?, ?)';
      connection.query(insertQuery, [username, hashedPassword], (insertError, insertResults) => {
        if (insertError) {
          console.error('Error inserting user into database:', insertError);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to login
app.post('/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user in the database
    const query = 'SELECT * FROM admins WHERE username = ?';
    connection.query(query, [username], async (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
