import React from 'react';

const WelcomeScreen = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark-transparent ">
                <div className="container text-light">
                    <a className="navbar-brand  text-light" href="/">Blockchain voting</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/admin">Admin</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/register">Voter registration</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/voter">Voter login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default WelcomeScreen;
