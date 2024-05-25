import React from 'react';
import Header from './Header';
import './About.css';

const About = () => {
    return (
        <div>
            <Header />
            <div className="about-container">
            <div className="welcome-message">
                <h1>About Us</h1>
                <p>Welcome to Fitness Gym! We are dedicated to helping you achieve your fitness goals.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
