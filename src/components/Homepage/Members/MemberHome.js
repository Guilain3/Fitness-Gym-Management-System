// src/components/Homepage/Members/MemberHome.js
import React from 'react';
import MemberHeader from './MemberHeader';
import './MemberHome.css';

const MemberHome = () => {
    return (
        <div>
            <MemberHeader /> {/* Correct component name */}
            <div className="member-container">
            <div className="welcome-message">
                <h1>Member Information</h1>
                <p>Member Information Manipulation: Register, update, delete and view Member List</p>
            </div>    
            </div>
        </div>
    );
}

export default MemberHome;
