import React from 'react';
import { Link } from 'react-router-dom';

const Homepagestaff = () => {
    return (
                <nav className="crud-side">
                    <div className="position-sticky">
                        <div className="nav flex-column">
                            <Link className="nav-link" to="/staff">staff Dashboard</Link>
                            <Link className="nav-link" to="/">Manage User</Link>
                           
                        </div>
                    </div>
                </nav>
    );
}

export default Homepagestaff;
