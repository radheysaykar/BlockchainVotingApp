// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string candidateHash;
        uint256 voteCount;
    }
    
    struct Voter {
        string voterHash;
        bool voted;
        string vote;
        uint256 voteIndex;
    }

    mapping(string => Candidate) public candidates;
    
    uint256 public lastcandidateindex;

    address owner;
    
    mapping(string => Voter) IDtoVoter;

    bool electionStartedFlag;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidateNames) {
       /* uint256 i = 1;
        for (; i < _candidateNames.length; i++) {
            candidates[i] = Candidate({
                name: _candidateNames[i],
                voteCount: 0
            });
            
        }
        lastcandidateindex = i - 1;

        owner = msg.sender;

        electionStartedFlag = false;*/
    }



    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    

/*
    function startElection(uint256 _durationInMinutes) public {
        require(electionStartedFlag == false, "Election already started");
        electionStartedFlag = true;

        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }    
*/
    function addCandidate(string memory aadhaar, string memory candidateHash) public {
        require(bytes(aadhaar).length > 0, "Aadhaar must be a non-empty string");
        require(bytes(candidateHash).length > 0, "Candidate hash must be a non-empty string");
        require(candidates[aadhaar].voteCount == 0, "Candidate already exists");

        candidates[aadhaar] = Candidate(candidateHash, 0);
    }

    function setDates(uint256 _startDateTime, uint256 _endDateTime) public {
        //require(votingEnd == 0 && votingStart == 0, "Voting dates already set");
       // require(_startDateTime > block.timestamp, "Start date and time must be in the future");
        require(_endDateTime > _startDateTime, "End date and time must be after the start date and time");
        
        votingStart = _startDateTime;
        votingEnd = _endDateTime;
    }
     /*  

    function addCandidate(string memory _name) public onlyOwner {
     require(electionStartedFlag == false, "Election started");

        candidates[lastcandidateindex + 1] = (Candidate({
                name: _name,
                voteCount: 0
        }));

        lastcandidateindex++;
    }*/

  /*  function removeCandidate(uint256 index) public onlyOwner {
        require(electionStartedFlag == false, "Election started");
        require(lastcandidateindex >= index, "Invalid index");
        
        delete candidates[index];
    }
*/
    function vote(string memory voterID, string memory _candidateIndex) public {
        require(!IDtoVoter[voterID].voted, "Voter have already voted.");
        //require(_candidateIndex <= lastcandidateindex, "Invalid candidate index.");
        require(block.timestamp >= votingStart);
        require(block.timestamp < votingEnd);
        //require(electionStartedFlag == true, "Election not started");
        

        candidates[_candidateIndex].voteCount++;
        IDtoVoter[voterID].voted = true;
        IDtoVoter[voterID].vote = _candidateIndex;
        IDtoVoter[voterID].voteIndex = candidates[_candidateIndex].voteCount;
    }
/*
    function VerifyVote(string memory voterID) public view returns (string, uint256) {
        return (IDtoVoter[voterID].vote, IDtoVoter[voterID].voteIndex);
    }
*/
    function hasVoted(string memory voterID) public view returns (bool) {
        return (IDtoVoter[voterID].voted);
        
    } 

    function electionStarted() public view returns (bool) {
        return electionStartedFlag;
    } 

    function getCandidate(string memory _candidateIndex) public view returns (uint256){
        return candidates[_candidateIndex].voteCount;
    }

    /*function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }
    

    function getRemainingTime() public view returns (uint256) {

        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    */

    function getStartingTime() public view returns (uint256) {

        return votingStart;
    }

    function getEndingTime() public view returns (uint256) {

    return votingEnd;
    }

}
