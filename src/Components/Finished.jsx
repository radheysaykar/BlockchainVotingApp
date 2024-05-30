
// import React, { useEffect, useState } from 'react';

// const Finished = (props) => {
//   props.getWinnerName();

//   // if(!props.not_voted) props.verifyVote(); // Invoke the async function

//   return (
//     <div className="login-container p-4 rounded-lg shadow-sm finished-container">
//   <div className="bg-dark-transparent text-white rounded p-3 mb-4">
//     <h1 className="text-3xl text-center font-weight-bold mb-4">Voting is Finished</h1>
//     <>
//       <p className="text-lg">
//         Winner: {props.winner} from {props.winnerParty}
//       </p>

//       {props.voteData && (
//         <p className="text-lg">
//           Your vote was counted at number {props.voteData[1]} for {props.voteData[0]}
//         </p>
//       )}
//     </>
//   </div>

//   <button
//     className="btn btn-danger mt-4 px-4 py-2 rounded-lg"
//     onClick={props.logout}
//   >
//     Logout
//   </button>
// </div>
//   );
// };

// export default Finished;

import React from 'react';
import styles from './finished.module.css';

const Finished = (props) => {
  props.getWinnerName();

  return (
    <div className={`${styles.finishedContainer} ${styles.shadowSm}`}>
      <div className={`${styles.bgDarkTransparent} ${styles.textWhite} ${styles.rounded} ${styles.mb4}`}>
        <h1 className={`${styles.text3xl} ${styles.textCenter} ${styles.fontWeightBold} ${styles.mb4}`}>
          Voting is Finished
        </h1>
        <>
          <p className={styles.textLg}>
            Winner: {props.winner} from {props.winnerParty}
          </p>

          {props.voteData && (
            <p className={styles.textLg}>
              Your vote was counted at number {props.voteData[1]} for {props.voteData[0]}
            </p>
          )}
        </>
      </div>

      <button
        className={`${styles.btn} ${styles.btnDanger} ${styles.mt4} ${styles.px4} ${styles.py2} ${styles.roundedLg}`}
        onClick={props.logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Finished;