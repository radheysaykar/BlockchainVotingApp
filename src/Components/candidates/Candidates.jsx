// import React, { useState } from 'react';
// import { toast, Toaster } from 'react-hot-toast';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// // import './candidates.css';
// const CandidateRegistrationForm = () => {
//   const [fullName, setFullName] = useState('');
//   const [aadhaar, setAadhaar] = useState('');
//   const [dob, setDOB] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [party, setParty] = useState('');
//   // const [constituency, setConstituency] = useState('');
//   const [state, setState] = useState('');
//   const [education, setEducation] = useState('');
//   const [background, setBackground] = useState('');
//   const [experience, setExperience] = useState('');
//   const [signature, setSignature] = useState('');
//   const [date, setDate] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/addCandidate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullName,
//           aadhaar,
//           dob,
//           address,
//           phone,
//           email,
//           party,
//           // constituency,
//           state,
//           education,
//           background,
//           experience,
//           signature,
//           date,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to register candidate');
//       }

//       toast.success('Candidate registered successfully!');
//       // Handle success, e.g., reset form fields or navigate
//     } catch (error) {
//       setError(error.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <Toaster />
//       <h1>Candidate Registration Form</h1>
//       <form onSubmit={handleSubmit}>
//         <section>
//           <h2>Personal Details</h2>
//           <div className="mb-3">
//             <label htmlFor="fullName" className="form-label">Full Name:</label>
//             <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="aadhaar" className="form-label">Aadhaar:</label>
//             <input type="text" className="form-control" id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} required />
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
//             <PhoneInput country={"in"} inputClass="form-control" value={phone} onChange={setPhone} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email Address:</label>
//             <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//         </section>

//         <section>
//           <h2>Political Information</h2>
//           <div className="mb-3">
//             <label htmlFor="party" className="form-label">Party Affiliation:</label>
//             <input type="text" className="form-control" id="party" value={party} onChange={(e) => setParty(e.target.value)} required />
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="constituency" className="form-label">Constituency:</label>
//             <input type="text" className="form-control" id="constituency" value={constituency} onChange={(e) => setConstituency(e.target.value)} required />
//           </div> */}
//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">State:</label>
//             <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
//           </div>
//         </section>

//         <section>
//           <h2>Additional Details</h2>
//           <div className="mb-3">
//             <label htmlFor="education" className="form-label">Educational Qualifications:</label>
//             <textarea className="form-control" id="education" rows="2" value={education} onChange={(e) => setEducation(e.target.value)}></textarea>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="background" className="form-label">Professional Background:</label>
//             <textarea className="form-control" id="background" rows="2" value={background} onChange={(e) => setBackground(e.target.value)}></textarea>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="experience" className="form-label">Previous Political Experience (if any):</label>
//             <textarea className="form-control" id="experience" rows="2" value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
//           </div>
//         </section>

//         <div className="declaration">
//           <p>I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
//           <div className="mb-3">
//             <label htmlFor="signature" className="form-label">Signature of Candidate:</label>
//             <input type="text" className="form-control" id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">Date:</label>
//             <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default CandidateRegistrationForm; 

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './candidates.module.css';

const CandidateRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [party, setParty] = useState('');
  // const [constituency, setConstituency] = useState('');
  const [state, setState] = useState('');
  const [education, setEducation] = useState('');
  const [background, setBackground] = useState('');
  const [experience, setExperience] = useState('');
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/addCandidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          aadhaar,
          dob,
          address,
          phone,
          email,
          party,
          // constituency,
          state,
          education,
          background,
          experience,
          signature,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register candidate');
      }

      toast.success('Candidate registered successfully!');
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
      <h1>Candidate Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Personal Details</h2>
          <div className={styles.mb3}>
            <label htmlFor="fullName" className={styles.formLabel}>Full Name:</label>
            <input type="text" className={styles.formControl} id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="aadhaar" className={styles.formLabel}>Aadhaar:</label>
            <input type="text" className={styles.formControl} id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} required />
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
            <PhoneInput country={"in"} inputClass={styles.formControl} value={phone} onChange={setPhone} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="email" className={styles.formLabel}>Email Address:</label>
            <input type="email" className={styles.formControl} id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </section>

        <section>
          <h2>Political Information</h2>
          <div className={styles.mb3}>
            <label htmlFor="party" className={styles.formLabel}>Party Affiliation:</label>
            <input type="text" className={styles.formControl} id="party" value={party} onChange={(e) => setParty(e.target.value)} required />
          </div>
          {/* <div className={styles.mb3}>
            <label htmlFor="constituency" className={styles.formLabel}>Constituency:</label>
            <input type="text" className={styles.formControl} id="constituency" value={constituency} onChange={(e) => setConstituency(e.target.value)} required />
          </div> */}
          <div className={styles.mb3}>
            <label htmlFor="state" className={styles.formLabel}>State:</label>
            <input type="text" className={styles.formControl} id="state" value={state} onChange={(e) => setState(e.target.value)} required />
          </div>
        </section>

        <section>
          <h2>Additional Details</h2>
          <div className={styles.mb3}>
            <label htmlFor="education" className={styles.formLabel}>Educational Qualifications:</label>
            <textarea className={styles.formControl} id="education" rows="2" value={education} onChange={(e) => setEducation(e.target.value)}></textarea>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="background" className={styles.formLabel}>Professional Background:</label>
            <textarea className={styles.formControl} id="background" rows="2" value={background} onChange={(e) => setBackground(e.target.value)}></textarea>
          </div>
          <div className={styles.mb3}>
            <label htmlFor="experience" className={styles.formLabel}>Previous Political Experience (if any):</label>
            <textarea className={styles.formControl} id="experience" rows="2" value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
          </div>
        </section>

        <div className={styles.declaration}>
          <p>I hereby declare that the information provided above is true to the best of my knowledge and belief.</p>
          <div className={styles.mb3}>
            <label htmlFor="signature" className={styles.formLabel}>Signature of Candidate:</label>
            <input type="text" className={styles.formControl} id="signature" value={signature} onChange={(e) => setSignature(e.target.value)} required />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="date" className={styles.formLabel}>Date:</label>
            <input type="date" className={styles.formControl} id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>

        <button type="submit" className={styles.btnPrimary} disabled={loading}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CandidateRegistrationForm;