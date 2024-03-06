import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Finished from './Components/Finished';
import Connected from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);
  const [winnerName, setwinnerName] = useState(null);
  const [votersvote, setvotersvote] = useState(null);
  const [votersvoteindex, setvotersvoteindex] = useState(null);
  const [itemList, setItemList] = useState(["0xa3Aa429d5A5944B4C3ABd50b5B0505a53797f5C8"]);
  

  useEffect( () => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  async function vote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );

      const tx = await contractInstance.vote(number);
      await tx.wait();
      canVote();
  }


  async function canVote() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const voteStatus = await contractInstance.voters(await signer.getAddress());

      const addressToCheck = (await signer.getAddress());

      // Check if the addressToCheck is in itemList
      const isAddressInList = itemList.includes(addressToCheck);

      // Use the result in your component logic
      console.log(isAddressInList, "&&&&&&&&&&&&&&&&&&&&"); // This will be either true or false

      setCanVote(!voteStatus && isAddressInList);

  }

  async function verifyVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const votersvote = await contractInstance.votersvote(await signer.getAddress());
    setvotersvote(votersvote.toNumber());
    const votersvoteindex = await contractInstance.votersvoteindex(await signer.getAddress());
    setvotersvoteindex(votersvoteindex.toNumber());

}

  async function getCandidates() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          // voteCount: candidate.voteCount.toNumber()
        }
      });
      setCandidates(formattedCandidates);
  }

  async function getWinnerName() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );
    const candidatesList = await contractInstance.getAllVotesOfCandiates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    
    // Find the candidate with the maximum votes
    const winner = formattedCandidates.reduce((maxVotesCandidate, currentCandidate) => {
      return currentCandidate.voteCount > maxVotesCandidate.voteCount ? currentCandidate : maxVotesCandidate;
    }, formattedCandidates[0]);
console.log(winnerName);
    // Store the winner's name in WinnerName
    setwinnerName(winner.name);
  }

  async function getCurrentStatus() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getVotingStatus();
      console.log(status);
      setVotingStatus(status);
  }

  async function getRemainingTime() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const time = await contractInstance.getRemainingTime();
      setremainingTime(parseInt(time, 16));
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      { 
      // votingStatus ?
        (isConnected ? 
          (<Connected 
          account = {account}
          candidates = {candidates}
          remainingTime = {remainingTime}
          number= {number}
          handleNumberChange = {handleNumberChange}
          voteFunction = {vote}
          votingdone = {!CanVote}/>) 
          
          : 
          
          (<Login connectWallet = {connectToMetamask}/>)) 
        // : 
        // (<Finished  name = {winnerName} getWinnerName = {getWinnerName} votersvote = {votersvote} votersvoteindex = {votersvoteindex} verifyVote = {verifyVote}/>)
      }
      
    </div>
  );



}





export default App;
