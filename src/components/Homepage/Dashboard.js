import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="dashboard-container">
            <div className="welcome-message">
                <h1>Admin Dashboard</h1>
                <div className="button-container">
                    <Link to="/users" className="dashboard-button">Users</Link>
                    <Link to="/members" className="dashboard-button">Members</Link>
                    <Link to="/trainers" className="dashboard-button">Trainers</Link>
                    <Link to="/equipment" className="dashboard-button">Equipment</Link>
                    <Link to="/workouts" className="dashboard-button">Workouts</Link>
                    <Link to="/payments" className="dashboard-button">Payments</Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
