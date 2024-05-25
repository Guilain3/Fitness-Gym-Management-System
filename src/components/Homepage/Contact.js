import React from 'react';
import Header from './Header';
import './Contact.css';

const Contact = () => {
    return (
        <div>
            <Header />
            <div className="contact-container">
            <div className="welcome-message">
                <h1>Contact Us</h1>
                <p>Feel free to contact us for any inquiries or assistance.</p>
                <p>Email: info@fitnessgym.com</p>
                <p>Phone: +1234567890</p>
            </div>
            </div>
        </div>
    );
}

export default Contact;
