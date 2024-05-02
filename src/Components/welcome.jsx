import React from 'react';

const WelcomeScreen = () => {
    return (
        <section className="container d-flex align-items-center justify-content-center vh-100">
    <div className='text-white bg-dark-transparent p-4'>
            <div className="text-center mb-4">
                <h1>Welcome to Blockchain Voting Website</h1>
            </div>
            <div className="text-center mb-4">
                <a href= "/voter" className="btn btn-primary">Voter Login</a>
                /
                <a href= "/admin" className="btn btn-primary">Admin Login</a>
            </div>
            <div className="text-center">
                <p>Created by: Radhey Saykar, Varad Kalambkar, Ankit Kumar, Mahesh Sathe</p>
            </div>
        </div>
        </section>
    );
}

export default WelcomeScreen;
