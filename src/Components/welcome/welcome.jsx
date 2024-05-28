// import React from 'react';
// import './welcome.css';

// const App = () => {
//     return (
//         <div className="app">
//             <Navbar />
//             <Main />
//             <Footer />
//         </div>
//     );
// }


// const Navbar = () => {
//     return (
//         // <div>
//         //     <nav className="navbar navbar-expand-lg navbar-light bg-dark-transparent ">
//         //         <div className="container text-light">
//         //             <a className="navbar-brand  text-light" href="/">Blockchain voting</a>
                    
//         //             <div className="collapse navbar-collapse" id="navbarNav">
//         //                 <ul className="navbar-nav ml-auto">
//         //                     <li className="nav-item">
//         //                         <a className="nav-link text-light" href="/">Home</a>
//         //                     </li>
//         //                     <li className="nav-item">
//         //                         <a className="nav-link text-light" href="/admin">Admin</a>
//         //                     </li>
//         //                     <li className="nav-item">
//         //                         <a className="nav-link text-light" href="/candidates">Candidate</a>
//         //                     </li>
//         //                     <li className="nav-item">
//         //                         <a className="nav-link text-light" href="/register">Voter registration</a>
//         //                     </li>
//         //                     <li className="nav-item">
//         //                         <a className="nav-link text-light" href="/voter">Voter login</a>
//         //                     </li>
//         //                 </ul>
//         //             </div>
//         //         </div>
//         //     </nav>
//         // </div>

//         <nav className="navbar">
//             <div className="navbar-left">
//                 <a href="#home">Home</a>
//             </div>
//             <div className="navbar-center">
//                 <input type="text" placeholder="Search..." className="search-box" />
//             </div>
//             <div className="navbar-right">
//                 <a href="/admin">Admin</a>
//                 <a href="/register">Voter Registration</a>
//                 <a href="/candidates">Candidate Registration</a>
//             </div>
//         </nav>
//     );
// }

// const Main = () => {
//     return (
//     //     <div>
//     //         <Navbar/>
//     //         <section className="container d-flex align-items-center justify-content-center vh-100">
//     // <div className='text-white bg-dark-transparent p-4'>
        
//     //         <div className="text-center mb-4">
//     //             <h1>Welcome to Blockchain Voting Website</h1>
//     //         </div>
//     //         <div className="text-center mb-4">
//     //             <a href= "/voter" className="btn btn-primary">Voter Login</a>
//     //             /
//     //             <a href= "/admin" className="btn btn-primary">Admin Login</a>
//     //         </div>
//     //         <div className="text-center">
//     //             <p>Created by: Radhey Saykar, Varad Kalambkar, Ankit Kumar, Mahesh Sathe</p>
//     //         </div>
//     //     </div>
//     //     </section>
//     //     </div>

//     <div className="main">
//     <h1>Decentralized Voting System Using Blockchain</h1>
//     <div className="buttons">
//         <a href= "/voter" className="btn">Voter Login</a>
//         <a href= "/admin"  className="btn">Admin Login</a>
//     </div>
// </div>
        
//     );
// }

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <p>Created By Radhey, Ankit, Varad, Mahesh</p>
//             <div className="social-icons">
//                 <a href="#"><i className="fab fa-facebook-f"></i></a>
//                 <a href="#"><i className="fab fa-twitter"></i></a>
//                 <a href="#"><i className="fab fa-instagram"></i></a>
//             </div>
//         </footer>
//     );
// }


// export default App;


import React from 'react';
import styles from './welcome.module.css';

const App = () => {
    return (
        <div className= {styles.app}>
            <Navbar />
            <Main />
            <Footer />
        </div>
    ); 
}


const Navbar = () => {
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-dark-transparent ">
        //         <div className="container text-light">
        //             <a className="navbar-brand  text-light" href="/">Blockchain voting</a>
                    
        //             <div className="collapse navbar-collapse" id="navbarNav">
        //                 <ul className="navbar-nav ml-auto">
        //                     <li className="nav-item">
        //                         <a className="nav-link text-light" href="/">Home</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-light" href="/admin">Admin</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-light" href="/candidates">Candidate</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-light" href="/register">Voter registration</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link text-light" href="/voter">Voter login</a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </div>

        <nav className={styles.navbar}>
            <div className={styles.navbar_left}>
                <a href="#home">Home</a>
            </div>
            <div className={styles.navbar_center}>
                <input type="text" placeholder="Search..." className= {styles.search_box} />
            </div>
            <div className= {styles.navbar_right}>
                <a href="/admin">Admin</a>
                <a href="/register">Voter Registration</a>
                <a href="/candidates">Candidate Registration</a>
            </div>
        </nav>
    );
}

const Main = () => {
    return (
    //     <div>
    //         <Navbar/>
    //         <section className="container d-flex align-items-center justify-content-center vh-100">
    // <div className='text-white bg-dark-transparent p-4'>
        
    //         <div className="text-center mb-4">
    //             <h1>Welcome to Blockchain Voting Website</h1>
    //         </div>
    //         <div className="text-center mb-4">
    //             <a href= "/voter" className="btn btn-primary">Voter Login</a>
    //             /
    //             <a href= "/admin" className="btn btn-primary">Admin Login</a>
    //         </div>
    //         <div className="text-center">
    //             <p>Created by: Radhey Saykar, Varad Kalambkar, Ankit Kumar, Mahesh Sathe</p>
    //         </div>
    //     </div>
    //     </section>
    //     </div>

    <div className= {styles.main}>
    <h1>Decentralized Voting System Using Blockchain</h1>
    <div className= {styles.buttons}>
        <a href= "/voter" className= {styles.btn}>Voter Login</a>
        <a href= "/admin"  className= {styles.btn}>Admin Login</a>
    </div>
</div>
        
    );
}

const Footer = () => {
    return (
        <footer className= {styles.footer}>
            <p>Created By Radhey, Ankit, Varad, Mahesh</p>
            {/* <div className= {styles.social-icons}>
                <a href="#"><i className= {styles.fab fa-facebook-f}></i></a>
                <a href="#"><i className= {styles.fab fa-twitter}></i></a>
                <a href="#"><i className= {styles.fab fa-instagram}></i></a>
            </div> */}
        </footer>
    );
}


export default App;