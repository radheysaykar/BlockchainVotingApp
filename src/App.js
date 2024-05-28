import { useState, useEffect ,useRef} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import {ethers} from 'ethers';
import Welcome from './Components/welcome/welcome.jsx';
import PhoneNoLogin from './Components/PhoneNoLogin.jsx';
import Finished from './Components/Finished';
import Admin from './Components/admin/Admin.jsx';
import Candidates from './Components/candidates/Candidates.jsx';
import Registration from './Components/registration/registration.jsx';
import Connected from './Components/connected/Connected.jsx';
import SimpleStorageABI from './MyContractABI.json';
  
// import './App.css';  
function GoToMenu() {
  return (
    <div style={{ position: 'fixed', up: '20px', right: '20px' }}>
      <a href="/">
        Go to the Main Page
      </a>
    </div>
  );
}


function VotingNotStartedDisplay() {

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Election Not Started</h2>
        <p>The election has not started yet. Please check back later.</p>
        <a href='/' >OK</a>
      </div>
    </div>
  );
}

function App() {
  const [votingStatus, setVotingStatus] = useState(false);
  const [remainingTime, setremainingTime] = useState('');
  const [electionStartedStatus, setElectionStartedStatus] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [CanVote, setCanVote] = useState(false); // false : voter already done voting
  const [voterID, setvoterID] = useState(null);
  const [votingStartTime, setVotingStartTime] = useState(null);
  const [votingEndTime, setVotingEndTime] = useState(null);
  const [winner, setWinner] = useState(null);
  const [voteData, setVoteData] = useState(null);
  const [contract, setContract] = useState(null);
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
  const API_URL = process.env.REACT_APP_BLOCKCHAIN_API_URL

  
  useEffect(() => {
    // async function fetchContract() {
      const provider = new ethers.JsonRpcProvider(API_URL);
    
      const signer = new ethers.Wallet(PRIVATE_KEY, provider); 
    
      setContract(new ethers.Contract(CONTRACT_ADDRESS, SimpleStorageABI, signer));
    // }

  }, []);

  useEffect(() => {
    if(contract){
      getCandidates();
      electionStarted();
    }

  }, [contract]);
  const prevVotingStartTimeRef = useRef();
  const prevVotingEndTimeRef = useRef();
  useEffect(() => {
    console.log("votingStartTime, votingEndTime", votingStartTime, votingEndTime);

    if (
      prevVotingStartTimeRef.current !== votingStartTime &&
      prevVotingEndTimeRef.current !== votingEndTime
    ) {
      checkElectionStartedStatus();
    }

    // Update the refs with the current values
    prevVotingStartTimeRef.current = votingStartTime;
    prevVotingEndTimeRef.current = votingEndTime;
    console.log("electionStartedStatus, votingStatus", electionStartedStatus, votingStatus)
  }, [votingStartTime, votingEndTime]);

  useEffect(() => {
    getVotingStartTime();
    getVotingEndTime();
        getCandidates();
        
      }, [voterID]);
      
  useEffect( () => {
    // getRemainingTime();
    getCurrentStatus();
    console.log("electionStartedStatus...", electionStartedStatus)
  });

  useEffect( () => {

    canVote();
  }, [voterID]);

//   const checkElectionStartedStatus = () => {
//     const currentTime = new Date().getTime();
//     console.log("1111111111111111111111111111111111111111",currentTime);
//     const startTime = new Date(Number(votingStartTime)).getTime();
//     console.log("2222222222222222222222222222222222222222222",votingStartTime, startTime);
//     const endTime = new Date(Number(votingEndTime)).getTime();
// console.log("*************************************************",votingEndTime,  endTime);
//     if (currentTime >= startTime) {
//       setElectionStartedStatus(true);
//     } else {
//       setElectionStartedStatus(false);
//     }
//     if (currentTime <= endTime) {
//       setVotingStatus(true);
//     } else {
//       setVotingStatus(false);
//     }
//   };


const checkElectionStartedStatus = () => {
  const currentTime = Date.now();
  console.log("Current Time:", currentTime);

  const startTime = Number(votingStartTime)* 1000; // Convert BigInt to number
  console.log("Voting Start Time:", votingStartTime, startTime);

  const endTime = Number(votingEndTime)* 1000; // Convert BigInt to number
  console.log("Voting End Time:", votingEndTime, endTime);

  if (currentTime >= startTime) {
    setElectionStartedStatus(true);
  } else {
    setElectionStartedStatus(false);
  }

  if (currentTime <= endTime) {
    setVotingStatus(true);
  } else {
    setVotingStatus(false);
  }
}

  const setVotingStartEndTime = async (startDate, startTime, endDate, endTime) => {

    const startDateTime = new Date(`${startDate}T${startTime}`).getTime() / 1000;
    const endDateTime = new Date(`${endDate}T${endTime}`).getTime() / 1000;

    try {
      console.log("      const tx = await contract.setDates()", startDateTime, endDateTime)
      await contract.setDates(startDateTime, endDateTime);
      alert('Dates set successfully');
    } catch (error) {
      console.error('Error setting dates:', error);
      alert('Error setting dates');
    }
  };

  async function getVotingStartTime() {
    try {
      if (!contract) return;

      const intr = await contract.getStartingTime();

      setVotingStartTime(intr);
    console.log("      const intr = await contract.getStartingTime()    ")
    } catch (error) {
      console.error('Error while checking voting status:', error);
    }
  }

  async function getVotingEndTime() {
    try {
      if (!contract) return;

      const intr = await contract.getEndingTime();

      setVotingEndTime(intr);
      console.log("      const intr = await contract.getEndingTime()    ")

    } catch (error) {
      console.error('Error while checking voting status:', error);
    }
  }
async function vote(candidateID) {
  try {
    if (!contract) return;

    console.log(voterID, candidateID);
    const tx = await contract.vote(voterID, candidateID);

    await tx.wait();
    console.log("voting successful");
    toast.success('Voting successful! Thank you for your voting!');
    toast.success(`Your vote was recorded for candidate ${candidateID}`);
    await canVote();
  } catch (error) {
    console.error('Error while voting:', error);
    // toast.error('Error while voting. Please try again later.');
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

async function canVote() {
  try {
    if (!contract) return;


    const voteStatus = await contract.hasVoted(voterID);
    console.log("voting done:", voteStatus);
    setCanVote(!voteStatus);
    console.log("canvote:", CanVote);
  } catch (error) {
    console.error('Error while checking voting status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// const getCandidateNameByIndex = (index) => {
//   // Find the candidate object with the specified index
//   const candidate = candidates.find(candidate => candidate.index === index);

//   // Return the name of the candidate, or null if not found
//   return candidate ? candidate.name : null;
// };

async function verifyVote() {
  try {
    if (!contract) return; console.log("5544444444455555",voteData, CanVote);
    if (!CanVote) return;
    console.log("5555555555");
    const [vote, voteIndex] = await contract.VerifyVote(voterID);
    const numberA = Number(vote);
    const numberB = Number(voteIndex);
    console.log(numberA, numberB, "#######");
    const candidate = await contract.getCandidate(numberA);
    setVoteData([candidate.name, numberB]);
  } catch (error) {
    console.error('Error while verifying vote:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// async function getCandidates() {
//   try {
//     if (!contract) return;

//     const candidatesList = await contract.getAllVotesOfCandiates();
//     const formattedCandidates = candidatesList.map((candidate, index) => ({
//       index: index,
//       name: candidate.name,
//       // voteCount: candidate.voteCount.toNumber()
//     }));
//     setCandidates(formattedCandidates);
//   } catch (error) {
//     console.error('Error while fetching candidates:', error);
//     // Handle error gracefully (e.g., show an error message to the user)
//   }
// }

async function getCandidates() {
  try {
//     console.log("lastcandidateindex_next", contract);

//     if (!contract) return;

    const candidatesList = [];
//     const lastcandidateindex = parseInt( await contract.lastcandidateindex, 16); // Assuming you have a way to track the total count of candidates
// console.log("lastcandidateindex");
//     for (let i = 0; i <= lastcandidateindex; i++) {
//       const candidate = await contract.getCandidate(i);
//       console.log("candidate", candidate)
//       if(candidate.name){
//         candidatesList.push({
//           index: i,
//           name: candidate.name,
//           // voteCount: candidate.voteCount
//         });
//       }
//     }
const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/candidates`);
if (!response.ok) {
  throw new Error('Network response was not ok');
}
const data = await response.json();

    setCandidates(data);
    console.log("candidateList.........from.........db", candidates)
  } catch (error) {
    console.error('Error while fetching candidates:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

const handleAddCandidate = async (candidate) => {
  try {
    if (!contract || !candidate) return;

    // Call the addCandidate function on the contract
    await contract.addCandidate(candidate);

    // Refresh the candidates list after adding a new candidate
    await getCandidates();

  } catch (error) {
    console.error('Error while adding candidate:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
};

const handleRemoveCandidate = async (index) => {
  try {
    if (!contract) return;

    await contract.removeCandidate(index);


    await getCandidates();
    
  } catch (error) {
    console.error('Error while removing candidate:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
};


async function getWinnerName() {
  try {
    if (!contract) return;

    // const winner = Number(await contract.getIndexOfMaxVoteCount());
    // const candidate = await contract.getCandidate(winner);
    // setWinner(candidate.name);


    let maxVotes = 0;
    let candidateWithMaxVotes = null;

    for (let i = 0; i < candidates.length; i++) {
      const candidateIndex = candidates[i].aadhaar_number;
      const voteCount = await contract.getCandidate(candidateIndex);

      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        candidateWithMaxVotes = candidates[i];
      }
    }

    if (candidateWithMaxVotes) {
      setWinner(candidateWithMaxVotes.aadhaar_number);
    }
  } catch (error) {
    console.error('Error while fetching winner name:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// async function startElection(durationInMinutes) {
//   try {
//     if (!contract) return;

//     console.log(electionStartedStatus, "electionStartedStatus********");
//     await contract.startElection(durationInMinutes);
//     setElectionStartedStatus(true);
//     console.log(electionStartedStatus, "electionStartedStatus_______")
//     toast.success('Election has started!');

//   } catch (error) {
//     console.error(error);
//     // Handle error gracefully (e.g., show an error message to the user)
//   }
// }


async function electionStarted() {
  try {

    // if (!contract) return;

    // const status = await contract.electionStarted();
    // setElectionStartedStatus(status);
    // if(!electionStartedStatus) 
    //     {
    //       setvoterID(null);
    //       toast.error('Election not started yet');
    //     }
  } catch (error) {
    console.error('Error while fetching current status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}
async function getCurrentStatus() {
  try {
    if (!contract) return;

    const status = await contract.getVotingStatus();
    setVotingStatus(status);
  } catch (error) {
    console.error('Error while fetching current status:', error);
    // Handle error gracefully (e.g., show an error message to the user)
  }
}

// async function getRemainingTime() {
//   try {
//     if (!contract) return;

//     const time = await contract.getRemainingTime();
//     setremainingTime(parseInt(time, 16));
//   } catch (error) {
//     console.error('Error while fetching remaining time:', error);
//     // Handle error gracefully (e.g., show an error message to the user)
//   }
// }

const logout = () => {
  setvoterID(null);
};


  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/admin" element={<Admin setVotingStartEndTime={setVotingStartEndTime} getVotingStartTime={getVotingStartTime} getVotingEndTime={getVotingEndTime} handleAddCandidate={handleAddCandidate} handleRemoveCandidate={handleRemoveCandidate} getCandidates={getCandidates} candidates = {candidates}/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/candidates" element={<Candidates/>} />
          <Route path="/voter"
            element={  
              (voterID !== null) ? 
                  (electionStartedStatus?
              ( votingStatus ?
                    (<Connected 
                    voterID = {voterID}
                    electionStartedStatus ={electionStartedStatus}
                    remainingTime = {remainingTime}
                    logout = {logout}
                    candidates = {candidates}
                    vote = {vote}
                    CanVote = {CanVote}/>)
              :  (<Finished  getWinnerName = {getWinnerName} winner = {winner} verifyVote = {verifyVote} voteData = {voteData} logout = {logout} not_voted = {CanVote}/>))
                    :<VotingNotStartedDisplay/>)
              :
              <PhoneNoLogin setvoterID = {setvoterID} />
            } />
        </Routes>
    </Router>
      <GoToMenu/>
      <Toaster />
    </div>
  );

}

export default App;
