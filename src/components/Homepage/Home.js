import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <header className="menu-header">
                <div className="logo">FITNESS GYM</div>
                <nav className="menu">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/workouts">Workouts</Link></li>
                        <li><Link to="/equipments">Equipments</Link></li>
                        <li><Link to="/paymentmethod">Payment Methods</Link></li>
                        <li><Link to="/dash">Dashboard</Link></li>
                        <li><Link to="/login">Logout</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="welcome-message">
                <h1>Welcome to Fitness Gym!</h1>
                <p>We are dedicated to helping you achieve your fitness goals.</p>
            </div>
        </div>
    );
}

export default Home;
