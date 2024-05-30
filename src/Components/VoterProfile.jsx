// src/components/VoterProfile.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './voterprofile.module.css';

const VoterProfile = ({ voter }) => {
    return (
        <div className={styles.voterProfile}>
            <h2>Voter Profile</h2>
            <div className={styles.profileDetails}>
                <p><strong>Aadhaar Number:</strong> {voter.aadhaar_number}</p>
                <p><strong>Name:</strong> {voter.name}</p>
                <p><strong>Email:</strong> {voter.email}</p>
                <p><strong>Phone Number:</strong> {voter.phone_number}</p>
                <p><strong>Address:</strong> {voter.address}</p>
                <p><strong>Date of Birth:</strong> {new Date(voter.dob).toLocaleDateString()}</p>
                <p><strong>Signature:</strong> {voter.signature}</p>
                <p><strong>Created At:</strong> {new Date(voter.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

VoterProfile.propTypes = {
    voter: PropTypes.shape({
        aadhaar_number: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        address: PropTypes.string,
        email: PropTypes.string,
        signature: PropTypes.string,
        created_at: PropTypes.string.isRequired
    }).isRequired
};

export default VoterProfile;
