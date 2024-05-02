import React from "react";
import { toast } from 'react-hot-toast';

const Connected = (props) => {

    const callVote = (candidate) => {
        props.vote(candidate);
        
    };
    // const handleInputChange = (event) => {
    //     const newValue = parseInt(event.target.value, 10); // Convert input value to an integer
    //     setCandidateNumber(newValue);
    // };

    return (
        
    <div className="connected-container">
        <div className="bg-dark-transparent text-white p-4 rounded-lg d-flex flex-column align-items-center">
        <p className="connected-account">Account: {props.voterID}</p>
        <p className="connected-account">Remaining Time: {props.remainingTime}</p> {console.log("props.canVote:", props.CanVote)}
        {props.CanVote ? (
            <div className="d-flex flex-column align-items-center">
                <table id="myTable" className="candidates-table mt-4 mb-4">
            <thead>
                <tr>
                    {/* <th className="px-4 py-2 text-dark">Index</th> */}
                    <th className="px-4 py-2 text-dark">Candidate Name</th>
                </tr>
            </thead>
            <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                        {/* <td className="px-4 py-2">{candidate.index}</td> */}
                        <td className="px-4 py-2">{candidate.name}</td>
                        <td className="px-4 py-2">
                            <button 
                                className="mt-4 px-6 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 focus:outline-none focus:bg-emerald-600"
                                onClick={callVote(candidate)}
                            >
                                Vote
                            </button>
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        ) : (
            <p className="connected-account">You have already voted</p>
        )}
        
        <button 
            className="btn btn-danger px-4 py-2 rounded-lg"
            onClick={props.logout}
        >
            Logout
        </button>
    </div>
</div>

    
    )
}

export default Connected;