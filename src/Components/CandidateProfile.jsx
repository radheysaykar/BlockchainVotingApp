// src/components/CandidateProfile.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './candidateprofile.module.css';

const CandidateProfile = ({ candidate }) => {
 
    return (
        <div className={styles.candidateProfile}>
            <h2>Candidate Profile</h2>
            <div className={styles.profileDetails}>
                <p><strong>Aadhaar Number:</strong> {candidate.aadhaar_number}</p>
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Party:</strong> {candidate.party}</p>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Phone Number:</strong> {candidate.phone_number}</p>
                <p><strong>Address:</strong> {candidate.address}</p>
                <p><strong>State:</strong> {candidate.state}</p>
                <p><strong>Date of Birth:</strong> {new Date(candidate.dob).toLocaleDateString()}</p>
                <p><strong>Education:</strong> {candidate.education}</p>
                <p><strong>Experience:</strong> {candidate.experience}</p>
                <p><strong>Background:</strong> {candidate.background}</p>
                <p><strong>Signature:</strong> {candidate.signature}</p>
                <p><strong>Created At:</strong> {new Date(candidate.created_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

CandidateProfile.propTypes = {
    candidate: PropTypes.shape({
        aadhaar_number: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
        education: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        party: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        signature: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
    }).isRequired
};

export default CandidateProfile;
