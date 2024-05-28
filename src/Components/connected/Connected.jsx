import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import './connected.css';
const Connected = (props) => {
    const [loading, setLoading] = useState(false);


    const callVote = (candidate) => () => {
        setLoading(true);
        props.vote(candidate);
        setLoading(false);
    };
    // const flattenedCandidates = props.candidates[0].flat();

        // Flatten candidates if the structure is an array of arrays
        const flattenedCandidates = Array.isArray(props.candidates) && props.candidates.length > 0 
        ? props.candidates[0].flat()
        : [];

        console.log("flattenedCandidates", flattenedCandidates);
    return (
        
//     <div className="connected-container">
        
//         <div className="bg-dark-transparent text-white p-4 rounded-lg d-flex flex-column align-items-center">
//         {(loading) && (<div>your vote is been processed</div>)}
//         <p className="connected-account">Account: {props.voterID}</p>
//         {/* <p className="connected-account">Remaining Time: {props.remainingTime}</p> {console.log("props.canVote:", props.CanVote)} */}
//         {props.CanVote ? (
//             <div className="d-flex flex-column align-items-center">
//                 <table id="myTable" className="candidates-table mt-4 mb-4">
//             <thead>
//                 <tr>
//                     {/* <th className="px-4 py-2 text-dark">Index</th> */}
//                     <th className="px-4 py-2 text-dark">Candidate Name</th>
//                     <th className="px-4 py-2">party</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {flattenedCandidates.map((candidate, index) => (
//                     <tr key={index}>
//                         {/* <td className="px-4 py-2">{candidate.index}</td> */}
//                         <td className="px-4 py-2">{candidate.name}</td>
//                         <td className="px-4 py-2">{candidate.party}</td>
//                         <td className="px-4 py-2">
//                             <button 
//                                 onClick={callVote(candidate.aadhaar_number)}
//                                 disabled={loading}
//                             >
//                                 Vote
//                             </button>
//                         </td>
                        
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//             </div>
//         ) : (
//             <p className="connected-account">You have already voted</p>
//         )}
        
//         <button 
//             className="btn btn-danger px-4 py-2 rounded-lg"
//             onClick={props.logout}
//         >
//             Logout
//         </button>
//     </div>
// </div>

<div className="container">
<div className="content">
    

    <div className="header">
        <h2 className="title">Voting Portal</h2>
        <p className="account">Account: {props.voterID}</p>
    </div>
    {(loading) && (<div>your vote is being processed</div>)}
    {props.CanVote ? (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header">Candidate Name</th>
                        <th className="table-header">Party</th>
                        <th className="table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {flattenedCandidates.map((candidate, index) => (
                        <tr key={index} className="table-row">
                            <td className="table-cell">{candidate.name}</td>
                            <td className="table-cell">{candidate.party}</td>
                            <td className="table-cell button-cell">
                                <button 
                                    className="vote-button"
                                    onClick={callVote(candidate.aadhaar_number)}
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
        <p className="message">You have voted</p>
    )}
    
    <div className="footer">
        <button 
            className="logout-button"
            onClick={props.logout}
        >
            Logout
        </button>
    </div>
</div>
</div>
    )
}

export default Connected;