require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { query } = require('./db');  // Import query function from db.js

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Utility function to handle database queries
async function executeQuery(sql, params) {
  try {
    const results = await query(sql, params);
    console.log("    const results = await query(sql, params)...............    ", results)
    return results;
  } catch (err) {
    console.error('Database query failed:', err.message);  // Log the actual error message
    throw new Error('Database query failed');
  }
}

// Routes
app.post('/api/election-dates', async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO election_dates (start_date, end_date) VALUES (?, ?)',
      [startDate, endDate]
    );
    res.status(201).json({ id: result.insertId, startDate, endDate });
  } catch (err) {
    next(err);
  }
});

// Route for adding election dates
app.post('/api/election-dates', async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
    const result = await executeQuery(
      'INSERT INTO election_dates (start_date, end_date) VALUES (?, ?)',
      [startDate, endDate]
    );
    res.status(201).json({ id: result.insertId, startDate, endDate });
  } catch (err) {
    next(err);
  }
});

// Route for fetching election dates
app.get('/api/election-dates', async (req, res, next) => {
  try {
    const rows = await executeQuery('SELECT * FROM election_dates');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// Route for fetching phone number based on Aadhaar number
app.get('/getPhoneNumber', async (req, res, next) => {
  const { aadhaarNumber } = req.query;

  try {
    // console.log("***************", aadhaarNumber);
    const results = await executeQuery('SELECT phone_number FROM users WHERE aadhaar_number = ?', [aadhaarNumber]);
    // console.log("***************results", results);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Phone number not found for the provided Aadhaar number' });
    }
        console.log("***************res",results);

    res.json({ phoneNumber: results[0][0].phone_number });

  } catch (err) {
    next(err);
  }
});

// Route for fetching all voters
app.get('/api/voters', async (req, res, next) => {
  try {
    const results = await executeQuery('SELECT * FROM users');
    res.json(results);

  } catch (err) {
    next(err);
  }
});

// Route for adding a new user
app.post('/addUser', async (req, res, next) => {
  const { fullName, dob, address, phone, email, aadhaarNumber, signature, date } = req.body;

  if (!aadhaarNumber || !fullName || !dob || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
    // Validate DOB and calculate age
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    if (age < 18) {
      return res.status(400).json({ error: 'User must be at least 18 years old' });
    }
  
  try {
    const existingUsers = await executeQuery('SELECT * FROM users WHERE aadhaar_number = ?', [aadhaarNumber]);
    if (existingUsers[0].length > 0) {
      console.log("existingUsers.....",existingUsers)

      return res.status(400).json({ message: 'Voter already exists' });
    }

    await executeQuery(
      'INSERT INTO users (aadhaar_number, name, dob, phone_number) VALUES (?, ?, ?, ?)',
      [aadhaarNumber, fullName, dob, phone]
    );
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    next(err);
  }
});

app.post('/addCandidate', async (req, res, next) => {
  const { 
    fullName,
    aadhaar,
    dob,
    address,
    phone,
    email,
    party,
    state,
    education,
    background,
    experience,
    signature,
    date
  } = req.body;

  if (!aadhaar || !fullName || !dob || !phone || !party) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
     // Validate DOB and calculate age
     const birthDate = new Date(dob);
     const today = new Date();
     let age = today.getFullYear() - birthDate.getFullYear();
     const monthDifference = today.getMonth() - birthDate.getMonth();
   
     // Adjust age if the birth date hasn't occurred yet this year
     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
       age--;
     }
   
     if (age < 18) {
       return res.status(400).json({ error: 'User must be at least 18 years old' });
     }
  
  try {
    const existingUsers = await executeQuery('SELECT * FROM candidates WHERE aadhaar_number = ?', [aadhaar]);
    if (existingUsers[0].length > 0) {
      console.log("existingUsers.....",existingUsers)
      return res.status(400).json({ message: 'Candidate already exists' });
    }
    await executeQuery(
      'INSERT INTO candidates (aadhaar_number, name, dob, phone_number, party, address, email, signature, state, education, background, experience, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        aadhaar, fullName, dob, phone, party, address, email, signature, state, education, background, experience, date
      ]
    );
    res.status(201).json({ message: 'Candidate added successfully' });
  } catch (err) {
    next(err);
  }
});

// Delete candidate by Aadhaar number
app.delete('/candidate/:aadhaar_number', async (req, res) => {
  const aadhaarNumber = req.params.aadhaar_number;
//DELETE	http://localhost:3000/candidate/121212121212
  const query = 'DELETE FROM candidates WHERE aadhaar_number = ?';
  
  try {
      const results = await executeQuery(query, [aadhaarNumber]);
      if (results.affectedRows === 0) {
          res.status(404).send('Candidate not found');
      } else {
          res.status(200).send('Candidate deleted successfully');
      }
  } catch (err) {
      console.error('Error deleting candidate:', err.message);
      res.status(500).send('Server error');
  }
});


app.get('/candidates', async (req, res) => {
  const sql = 'SELECT * FROM candidates';
  const results =  await executeQuery(sql);
    res.json(results);
});


// app.post('/addCandidate', async (req, res, next) => {
//   const { 
//     fullName,
//     aadhaar,
//     dob,
//     address,
//     phone,
//     email,
//     party,
//     // constituency,
//     state,
//     education,
//     background,
//     experience,
//     signature,
//     date
//    } = req.body;

//   if (!aadhaar || !fullName || !dob || !phone  || !party) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     await executeQuery(
//       'INSERT INTO candidates () VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [
//     aadhaar, fullName, dob, phone,  party, address, email, signature, state, education, background, experience
//       ]
//     );
//     res.status(201).json({ message: 'Candidate added successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// Route for registering a new admin
app.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUsers = await executeQuery('SELECT * FROM admins WHERE username = ?', [username]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await executeQuery('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
});

// Route for admin login
app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const users = await executeQuery('SELECT * FROM admins WHERE username = ?', [username]);
    console.log("...........users[0][0].password", users[0][0].password)
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0]; 
    const passwordMatch = await bcrypt.compare(password, users[0][0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
