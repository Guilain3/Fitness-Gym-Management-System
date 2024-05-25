import React from 'react';
import { Link } from 'react-router-dom';
import './MemberHeader.css';

const Header = () => {
    return (
        <header className="menu-header">
            <div className="logo">FITNESS GYM</div>
            <nav className="menu">
                <ul>
                    <li><Link to="/savemember">Register Member</Link></li>
                    <li><Link to="/updatemember">Update Member Infomation</Link></li>
                    <li><Link to="/searchmember">Search Member</Link></li>
                    <li><Link to="/deletemember">Delete Member</Link></li>
                    <li><Link to="/memberlist">Member List</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
