import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import './admin.css';
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

function GoToMenu() {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <a href="#home">
        Go to the Menu
      </a>
    </div>
  );
}

const Navbar = ({logout}) => {
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-dark-transparent ">
              <div className="container text-light">
                  <a className="navbar-brand  text-light" href="#home">Admin panal</a>
                  
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav ml-auto">
                          <li className="nav-item">
                              <a className="nav-link text-light" href="#voterlist">Voter List</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link text-light" href="#candidatelist">Candidate List</a>
                          </li>
                          <li className="nav-item">
                              <button onClick={logout}>logout</button>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </div>
  );
}

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      // const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log("###########",JSON.stringify({ username, password }));
      const response = await fetch(process.env.REACT_APP_API_BASE_URL+"/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      console.log("response", response)
      if (!response.ok) {
        console.log("response",response);
        console.log("response.statusText",response.statusText);
        throw new Error(response.statusText);
      }
      else
      {
        props.setAdminName(username);
      Cookies.set('adminName', encrypt(username), { expires: 7 });
      } 

      

      
      // Redirect to dashboard or handle login success
    } catch (error) {
      console.error('Login error:', error);
      setError(error);
    }
  };

  return (
    <div>
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
        <button type="button" class="btn btn-success" onClick={handleSubmit}>Login</button>
        
      </form>
    </div>
  );
}



//election with constituency
//  const StartEndElection = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedConstituency, setSelectedConstituency] = useState('');

//   // Sample list of constituencies, you can replace this with data fetched from an API or database
//   const constituencies = [
//     { id: 1, name: 'Constituency 1' },
//     { id: 2, name: 'Constituency 2' },
//     { id: 3, name: 'Constituency 3' },
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

    // const registrationData = {
    //   startDate,
    //   endDate,
    //   constituency: selectedConstituency,
    // };

    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/registrations`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(registrationData),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const data = await response.json();
    //   console.log('Registration data stored successfully:', data);
    //   // Handle success (e.g., display a success message, clear form, etc.)
    // } catch (error) {
    //   console.error('Error storing registration data:', error.message);
    //   // Handle error (e.g., display an error message)
    // }
//     console.log('Registration Start Date:', startDate);
//     console.log('Registration End Date:', endDate);
//     console.log('Selected Constituency:', selectedConstituency);
//   };

//   return (
//     <div>
//       <h2>Set Start and End Election Dates for Constituency</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Start Date:
//           <input
//             type="datetime-local"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           End Date:
//           <input
//             type="datetime-local"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Constituency:
//           <select
//             value={selectedConstituency}
//             onChange={(e) => setSelectedConstituency(e.target.value)}
//             required
//           >
//             <option value="" disabled>
//               Select a Constituency
//             </option>
//             {constituencies.map((constituency) => (
//               <option key={constituency.id} value={constituency.name}>
//                 {constituency.name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

const StartEndElection = ({setVotingStartEndTime, getVotingStartTime, getVotingEndTime, getCandidates}) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    setVotingStartEndTime(startDate, startTime, endDate, endTime);

  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Start Time:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          End Time:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </label>
      </div>
      <button onClick={handleSubmit}>Set Dates</button>
    </div>
  );
}


const StartEndRegistration = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationScheduleData = {
      startDate,
      endDate,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/registrationscheduling`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationScheduleData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('registrationScheduleData data stored successfully:', data);
      // Handle success (e.g., display a success message, clear form, etc.)
    } catch (error) {
      console.error('Error storing registrationScheduleData data:', error.message);
      // Handle error (e.g., display an error message)
    }
        console.log('Registration Start Date:', startDate);
    console.log('Registration End Date:', endDate);
  };

  return (
    <div>
      <h2>Set Start and End Registration Dates</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <br />
        <label>
          End Date:
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function Home({setVotingStartEndTime, getVotingStartTime, getVotingEndTime, handleStartElectionClick, setElectionDuration, electionDuration}) {
//   const [registrationStart, setRegistrationStart] = useState('');
//   const [registrationEnd, setRegistrationEnd] = useState('');
//   const [votingStart, setVotingStart] = useState('');
//   const [votingEnd, setVotingEnd] = useState('');

//   const handleRegistrationStartChange = (e) => {
//     setRegistrationStart(e.target.value);
//   };

//   const handleRegistrationEndChange = (e) => {
//     setRegistrationEnd(e.target.value);
//   };

//   const handleVotingStartChange = (e) => {
//     setVotingStart(e.target.value);
//   };

//   const handleVotingEndChange = (e) => {
//     setVotingEnd(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform actions with the specified dates and times, such as sending them to the server
//     console.log('Registration Start:', registrationStart);
//     console.log('Registration End:', registrationEnd);
//     console.log('Voting Start:', votingStart);
//     console.log('Voting End:', votingEnd);
//   };

  return (

  <div id="home">
        {/* <div>
      <h2>Admin Home Screen</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Registration Start:</label>
          <input type="datetime-local" value={registrationStart} onChange={handleRegistrationStartChange} required />
        </div>
        <div>
          <label>Registration End:</label>
          <input type="datetime-local" value={registrationEnd} onChange={handleRegistrationEndChange} required />
        </div>
        <div>
          <label>Voting Start:</label>
          <input type="datetime-local" value={votingStart} onChange={handleVotingStartChange} required />
        </div>
        <div>
          <label>Voting End:</label>
          <input type="datetime-local" value={votingEnd} onChange={handleVotingEndChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div> */}

    <h3>Start Election</h3>
    {/* <Dashboard/> */}
    <StartEndElection setVotingStartEndTime={setVotingStartEndTime} getVotingStartTime={getVotingStartTime} getVotingEndTime={getVotingEndTime} />
    {/* <StartEndRegistration/> */}
  </div>
  );
}

function CandidateList({candidates, handleRemoveCandidateClick, handleAddCandidateClick, candidateName, setCandidateName}) {
  // const [candidatelist, setCandidatelist] = useState(candidates[0]);



  // useEffect(() => {
  //   setCandidateList(candidates[0]);
    console.log("candidates************111100***", candidates)
  // }); 
  return (
    
    <div class="table-responsive">
      <table class="table table-bordered table-striped text-white">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>aadhaar_number</th>
            <th>party</th>
            <th>dob</th>
            <th>phone_number</th>
            {/* <th>Action</th> */}
          </tr>
        </thead> 
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.aadhaar_number}</td>
              <td>{candidate.party}</td>
              <td>{candidate.dob}</td>
              <td>{candidate.phone_number}</td>
              {/* <td><button class="btn btn-danger" onClick={() => handleRemoveCandidateClick(index)}>Remove</button></td> */}
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>

  )
}

function VoterList({voters}) {
  return (
        <div className="table-responsive" id="voterlist">
        <h3>Voter List</h3>
        <table className="table table-bordered table-striped text-white">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aadhaar Number</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter, index) => (
              <tr key={index}>
                <td>{voter.id}</td>
                <td>{voter.aadhaar_number}</td>
                <td>{voter.name}</td>
                <td>{voter.dob}</td>
                <td>{voter.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}



function Admin({setVotingStartEndTime, getVotingStartTime, getVotingEndTime, startElection, handleAddCandidate, handleRemoveCandidate }) {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [electionDuration, setElectionDuration] = useState(0);
  const [adminName, setAdminName] = useState(null);


    
  useEffect(() => {
    // if (username === null) {
    //   Cookies.remove('username');
    // } else {
    //   Cookies.set('username', username, { expires: 7 }); // Expires in 7 days
    // }
    // console.log("response***********",candidates)
    if (adminName === null) {  //useful at reload
      const adminName = Cookies.get('adminName');
      if(adminName)  setAdminName(decrypt(adminName));
    }

  }, []);
  
 


  const fetchVoters = async() => {

  await fetch(process.env.REACT_APP_API_BASE_URL+"/api/voters")
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
      console.log("***************voters", voters);
  }


  const fetchCandidates = async() => {

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/candidates`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  
      setCandidates(data);

  };
  
   if (Array.isArray(candidates) && candidates.length === 0) {
  
        fetchCandidates();
        console.log("***************candidates", candidates);
    }
  
  const handleAddCandidateClick = () => {
    if (candidateName.trim() !== '') {
      handleAddCandidate(candidateName);
      setCandidateName('');
    }
  };

  const handleRemoveCandidateClick = (index) => {
    handleRemoveCandidate(index);
  };

  const handleStartElectionClick = () => {
    if (electionDuration.trim() !== '') {
      startElection(electionDuration);
      setElectionDuration(0);
    }
  };

  const logout = () => {
    setAdminName(null);
    Cookies.remove('adminName');
    console.log("setAdminName(null)")
  };

  return (

    <div>
    {
      (adminName)?
      (<div>
        <h2>Admin Panel</h2>

        <div >
          <GoToMenu/>
          <Navbar logout = {logout}/>
          <Home setVotingStartEndTime={setVotingStartEndTime} getVotingStartTime={getVotingStartTime} getVotingEndTime={getVotingEndTime} handleStartElectionClick = {handleStartElectionClick} setElectionDuration = {setElectionDuration} electionDuration = {electionDuration}/>
          <VoterList voters = {voters}/>
          <CandidateList candidates = {candidates[0]} handleAddCandidateClick = {handleAddCandidateClick} handleRemoveCandidateClick = {handleRemoveCandidateClick}/>
          {/* <Routes>
            <Route path="/" element={} />
            <Route path="/voterlist" element={} />
            <Route path="/candidatelist" element={} />
          </Routes> */}
            
        </div>
      </div>):
      (<Login setAdminName = {setAdminName}/>)
    }
    </div>
  );
}

export default Admin;