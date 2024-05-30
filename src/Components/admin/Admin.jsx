
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CandidateProfile from '../CandidateProfile';
import VoterProfile from '../VoterProfile';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import styles from './admin.module.css'; // Import CSS module
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const Navbar = ({ logout }) => {
  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#home">Dashboard</a></li>
          <li><a href="#voterlist">Voter List</a></li>
          <li><a href="#candidatelist">Candidate List</a></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
};

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        props.setAdminName(username);
        Cookies.set('adminName', encrypt(username), { expires: 7 });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error);
    }
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ color: 'red' }}>{error}</div>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

const StartEndElection = ({ setVotingStartEndTime, getVotingStartTime, getVotingEndTime }) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVotingStartEndTime(startDate, startTime, endDate, endTime);
  };

  return (
    <div className={styles.startEndElection}>
      <h2>Set Election Dates</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Start Time:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          End Time:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
        <button type="submit">Set Dates</button>
      </form>
    </div>
  );
}

function Home({ setVotingStartEndTime, getVotingStartTime, getVotingEndTime }) {
  return (
    <div className={styles.home} id="home">
      <div className={styles.welcome}>
        <h3>Welcome to Admin Panel</h3>
      </div>
      <div className={styles.stats}>
        <div> </div>
        <div></div>
      </div>
      <StartEndElection setVotingStartEndTime={setVotingStartEndTime} getVotingStartTime={getVotingStartTime} getVotingEndTime={getVotingEndTime} />
    </div>
  );
}

function CandidateList({hashStoreCandidate, candidates }) {
  const [candidateList, setCandidateList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const callHashStoreCandidate = (candidate) => () => {
    hashStoreCandidate(candidate);
};
  useEffect(() => {
    if (Array.isArray(candidates) && candidates.length !== 0) {
      setCandidateList(candidates[0]);
    }
  }, [candidates]);

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const deleteCandidate = async (aadhaarNumber) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/candidate/${aadhaarNumber}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the candidate from the state
      setCandidateList(candidateList.filter(candidate => candidate.aadhaar_number !== aadhaarNumber));
      alert('Candidate deleted successfully');
    } catch (error) {
      console.error('Error deleting candidate:', error);
      alert('Failed to delete candidate');
    }
  };


  return (
    <div className={styles.tableContainer}>
    <div className={styles.tableResponsive} id="candidatelist">
      <h3>Candidate List</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Aadhaar Number</th>
            <th>Party</th>
            <th>DOB</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidateList.map((candidate, index) => (
            <tr key={index} onClick={() => handleRowClick(candidate)}>
              <td>{candidate.name}</td>
              <td>{candidate.aadhaar_number}</td>
              <td>{candidate.party}</td>
              <td>{candidate.dob.split('T')[0]}</td>
              <td>{candidate.phone_number}</td>
              <td><button onClick={callHashStoreCandidate(candidate)}>Approve</button>
              <button onClick={() => deleteCandidate(candidate.aadhaar_number)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {selectedCandidate && (
        <CandidateProfile candidate={selectedCandidate} />
      )}
    </div>
  );
}

function VoterList({ voters }) {
  const [selectedVoter, setSelectedVoter] = useState(null);

  const handleRowClick = (voter) => {
    setSelectedVoter(voter);
  };
  return (
    <div className={styles.tableContainer}>
    <div className={styles.tableResponsive} id="voterlist">
      <h3>Voter List</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Aadhaar Number</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        split<tbody>
          {voters.map((voter, index) => (
            <tr key={index} onClick={() => handleRowClick(voter)}>
              <td>{voter.id}</td>
              <td>{voter.aadhaar_number}</td>
              <td>{voter.name}</td>
              <td>{voter.dob.split('T')[0]}</td>
              <td>{voter.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {selectedVoter && (
        <VoterProfile voter={selectedVoter} />
      )}
    </div>
  );
}

function Admin({ hashStoreCandidate, setVotingStartEndTime, getVotingStartTime, getVotingEndTime }) {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [adminName, setAdminName] = useState(null);

  useEffect(() => {
    if (adminName === null) {
      const adminName = Cookies.get('adminName');
      if (adminName) setAdminName(decrypt(adminName));
    }
  }, []);

  const fetchVoters = async () => {
    await fetch(process.env.REACT_APP_API_BASE_URL + "/api/voters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVoters(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching voters:", error.message);
      });
  };

  if (Array.isArray(voters) && voters.length === 0) {
    fetchVoters();
  }

  const fetchCandidates = async () => {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/candidates");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setCandidates(data);
  };

  if (Array.isArray(candidates) && candidates.length === 0) {
    fetchCandidates();
  }

  const logout = () => {
    setAdminName(null);
    Cookies.remove('adminName');
  };

  return (
      <div className={styles.adminPanel}>
        {
          adminName ?
            (<div className={styles.main}>
              <Navbar logout={logout} />
              <div className={styles.content}>
                <Home setVotingStartEndTime={setVotingStartEndTime} getVotingStartTime={getVotingStartTime} getVotingEndTime={getVotingEndTime} />
                <VoterList voters={voters} />
                <CandidateList hashStoreCandidate={hashStoreCandidate} candidates={candidates} />
              </div>
              <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Election Management System. All rights reserved.
              </footer>
            </div>)
            :
            <Login setAdminName={setAdminName} />
        }
      </div>
  );
}  

export default Admin;