// Navbar.js
import React from 'react';
import './global.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
            <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
            <li className="nav-item">
                    <Link to="/itinerary" className="nav-link">Itinerary</Link>
                </li>
                <li className="nav-item">
                    <Link to="/events" className="nav-link">Events</Link>
                </li>
                <li className="nav-item">
                    <Link to="/hotels" className="nav-link">Hotels</Link>
                </li>
                <li className="nav-item">
                    <Link to="/currency converter" className="nav-link">Currency Converter</Link>
                </li>
                <li className="nav-item">
                    <Link to="/flights" className="nav-link">Flights</Link>
                </li>
                <li className="nav-item">
                    <Link to="/restaurants" className="nav-link">Restaurants</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
