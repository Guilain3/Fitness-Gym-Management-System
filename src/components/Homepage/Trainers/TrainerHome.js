
import React from 'react';
import TrainerHeader from './TrainerHeader';
import './TrainerHome.css';

const TrainerHome = () => {
    return (
        <div>
            <TrainerHeader />
            <div className="trainer-container">
                <h1>Trainer Information</h1>
                <p>Trainer Information Manipulation: Register, update, delete and view Trainer List</p>
            </div>
        </div>
    );
}

export default TrainerHome;
