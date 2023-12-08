import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Your Meal</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">List Meal API</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add an Item</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/mongo" className='nav-link'>James's favorite Meals</Link>
                        </li>

                    </ul>
                    
                </div>
            </nav>
        );
    }
}