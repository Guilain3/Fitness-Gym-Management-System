import React from 'react';
import { Link } from 'react-router-dom';
import './TrainerHeader.css';

const Header = () => {
    return (
        <header className="menu-header">
            <div className="logo">FITNESS GYM</div>
            <nav className="menu">
                <ul>
                    <li><Link to="/savetrainer">Register New Trainer</Link></li>
                    <li><Link to="/updatetrainer">Update Trainer Infomation</Link></li>
                    <li><Link to="/searchtrainer">Search Trainer</Link></li>
                    <li><Link to="/deletetrainer">Delete Trainer</Link></li>
                    <li><Link to="/trainerlist">Trainer List</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
