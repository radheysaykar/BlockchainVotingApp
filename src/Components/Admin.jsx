import React, { useState, useEffect } from 'react';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    try {
      // const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log("###########");
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error(response.message);
      }

      console.log(response.message);

      props.setAdminName(username);
      // Redirect to dashboard or handle login success
    } catch (error) {
      console.error('Login error:', error.message);
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
        <button type="button" class="btn btn-success" onClick={handleSubmit}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}



function Admin({ startElection, handleAddCandidate, handleRemoveCandidate, getCandidates, candidates }) {
  const [voters, setVoters] = useState([]);
  const [candidateName, setCandidateName] = useState('');
  const [electionDuration, setElectionDuration] = useState(0);
  const [adminName, setAdminName] = useState(null);

  if (Array.isArray(candidates) && candidates.length === 0) {
        getCandidates();
    }
    
   
    

  const fetchVoters = async() => {
  await fetch("http://localhost:3000/api/voters")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setVoters(data);
    })
    .catch((error) => {
      console.error("Error fetching voters:", error);
    });
};

 if (Array.isArray(voters) && voters.length === 0) {

      fetchVoters();
      console.log(voters);
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

  return (
    // <div>
    //   <h2>Admin Panel</h2>

    //   <div>
    //     <h3>Add Candidate</h3>
    //     <input
    //       type="text"
    //       placeholder="Candidate Name"
    //       value={candidateName}
    //       onChange={(e) => setCandidateName(e.target.value)}
    //     />
    //     <button onClick={handleAddCandidateClick}>Add Candidate</button>
    //   </div>

    //   <div>
    //     <h3>Remove Candidate</h3>

    //      {candidates.map((candidate, index) => (
    //         <div key={index}>
    //           <span>{candidate.name}</span>
    //           <button onClick={() => handleRemoveCandidateClick(index)}>Remove</button>
    //         </div>
    //       ))}
    //   </div>

    //   <div>
    //     <h3>Start Election</h3>
    //     <input
    //       type="text"
    //       placeholder="Duration in Minutes"
    //       value={electionDuration}
    //       onChange={(e) => setElectionDuration(e.target.value)}
    //     />
    //     <button onClick={handleStartElectionClick}>Start Election</button>
    //   </div>
    // </div>
<section className="container d-flex align-items-center justify-content-center vh-100">
    <div className='text-white bg-dark-transparent p-2'>

      {
        (adminName)?
        (<div>
          <h2>Admin Panel</h2>
    
          {/* <!-- Black transparent box to highlight important areas --> */}
          <div >
            <h3>Add Candidate</h3>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <button class="btn btn-success" onClick={handleAddCandidateClick}>Add Candidate</button>
            </div>
          </div>
    

          <div class="row mt-4">
    <div class="col-md-6">
       {/* <!-- Table for Candidate List --> */}
       <div class="table-responsive">
            <table class="table table-bordered table-striped text-white">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr key={index}>
                    <td>{candidate.name}</td>
                    <td><button class="btn btn-danger" onClick={() => handleRemoveCandidateClick(index)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
    <div class="col-md-6">
    <div className="table-responsive">
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
    </div>
  </div>

         

          {/* Voter List Table
      */}

    
          {/* <!-- Black transparent box to highlight important areas --> */}
          <div >
            <h3>Start Election</h3>
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                placeholder="Duration in Minutes"
                value={electionDuration}
                onChange={(e) => setElectionDuration(e.target.value)}
              />
              <button class="btn btn-success" onClick={handleStartElectionClick}>Start Election</button>
            </div>
          </div>
      </div>
    
          
    ):

      (<Login setAdminName = {setAdminName}/>)
    }
    </div>
</section>
  );
}

export default Admin;
