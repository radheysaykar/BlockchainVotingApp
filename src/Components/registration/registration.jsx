// import React, { useState } from 'react';
// import PhoneInput from "react-phone-input-2";
// import { toast, Toaster } from "react-hot-toast";
// import './registration.css';

// const VoterRegistrationForm = () => {
//   const [fullName, setFullName] = useState('');
//   const [dob, setDOB] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [aadhaarNumber, setAadhaarNumber] = useState('');
//   const [signature, setSignature] = useState('');
//   const [date, setDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/addUser`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullName,
//           dob,
//           address,
//           phone,
//           email,
//           aadhaarNumber,
//           signature,
//           date,
//         }),
//       });

//       // Handle successful response
//       if (!response.ok) {
//         throw new Error('Failed to register voter');
//       } else {
//         console.log("response", response);
//         toast.success('Voter registered successfully!');
//       }
    
//       const data = await response.json();
//       // Handle success, e.g., reset form fields or navigate
//     } catch (error) {
//       setError(error.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div className="container">
//     //   <h1>Voter Registration Form</h1>
//     //   <form onSubmit={handleSubmit}>
//     //     <section>
//     //       <h2>Personal Details</h2>
//     //       <div className="mb-3">
//     //         <label htmlFor="fullName" className="form-label">Full Name:</label>
//     //         <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="dob" className="form-label">Date of Birth (DOB):</label>
//     //         <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required />
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="address" className="form-label">Permanent Address:</label>
//     //         <textarea className="form-control" id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="phone" className="form-label">Phone Number:</label>
//     //         <PhoneInput country={"in"} inputClass="form-control" value={phone} onChange={setPhone} required />
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="email" className="form-label">Email Address:</label>
//     //         <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number:</label>
//     //         <input type="text" className="form-control" id="aadhaarNumber" maxLength="19" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} required />
//     //       </div>
//     //     </section>

//     //     <div className="declaration">
//     //       <p>I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
//     //       <div className="mb-3">
//     //         <label htmlFor="signature" className="form-label">Signature of Voter:</label>
//     //         <input type="text" className="form-control" id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} required />
//     //       </div>
//     //       <div className="mb-3">
//     //         <label htmlFor="date" className="form-label">Date:</label>
//     //         <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//     //       </div>
//     //     </div>

//     //     <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
//     //     {error && <p style={{ color: 'red' }}>{error}</p>}
//     //   </form>
//     // </div>


//     <div className="container">
//       <Toaster />
//       <h1>Voter Registration Form</h1>
//       <form onSubmit={handleSubmit}>
//         <section>
//           <h2>Personal Details</h2>
//           <div className="mb-3">
//             <label htmlFor="fullName" className="form-label">Full Name:</label>
//             <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="dob" className="form-label">Date of Birth (DOB):</label>
//             <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="address" className="form-label">Permanent Address:</label>
//             <textarea className="form-control" id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="phone" className="form-label">Phone Number:</label>
//             <PhoneInput country={'in'} inputClass="form-control" value={phone} onChange={setPhone} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email Address:</label>
//             <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number:</label>
//             <input type="text" className="form-control" id="aadhaarNumber" maxLength="12" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} required />
//           </div>
//         </section>

//         <div className="declaration">
//           <p>I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
//           <div className="mb-3">
//             <label htmlFor="signature" className="form-label">Signature of Voter:</label>
//             <input type="text" className="form-control" id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">Date:</label>
//             <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//           </div>
//         </div>

//         <button type="submit" className="btn" disabled={loading}>Submit</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default VoterRegistrationForm;

import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import { toast, Toaster } from "react-hot-toast";
import styles from './registration.module.css';

const VoterRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          dob,
          address,
          phone,
          email,
          aadhaarNumber,
          signature,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register voter');
      } else {
        console.log("response", response);
        toast.success('Voter registered successfully!');
      }
    
      const data = await response.json();
      // Handle success, e.g., reset form fields or navigate
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <h1>Voter Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Personal Details</h2>
          <div className={styles.mb3}>
            <label htmlFor="fullName" className={styles.formLabel}>Full Name:</label>
            <input type="text" className={styles.formControl} id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="dob" className={styles.formLabel}>Date of Birth (DOB):</label>
            <input type="date" className={styles.formControl} id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="address" className={styles.formLabel}>Permanent Address:</label>
            <textarea className={styles.formControl} id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="phone" className={styles.formLabel}>Phone Number:</label>
            <PhoneInput country={'in'} inputClass={styles.formControl} value={phone} onChange={setPhone} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="email" className={styles.formLabel}>Email Address:</label>
            <input type="email" className={styles.formControl} id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="aadhaarNumber" className={styles.formLabel}>Aadhaar Number:</label>
            <input type="text" className={styles.formControl} id="aadhaarNumber" maxLength="12" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} required />
          </div>
        </section>

        <div className={styles.declaration}>
          <p>I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
          <div className={styles.mb3}>
            <label htmlFor="signature" className={styles.formLabel}>Signature of Voter:</label>
            <input type="text" className={styles.formControl} id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="date" className={styles.formLabel}>Date:</label>
            <input type="date" className={styles.formControl} id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className={styles.btn} disabled={loading}>Submit</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default VoterRegistrationForm;