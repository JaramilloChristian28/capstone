import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
                <nav className="crud-side">
                    <div className="position-sticky">
                        <div className="nav flex-column">
                            <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                            <Link className="nav-link" to="/manageuser">Manage User</Link>
                            <Link className="nav-link" to="/managestudent">Manage Student</Link>
                            <Link className="nav-link" to="/managestrand">Manage Strand</Link>
                            <Link className="nav-link" to="/managesection">Manage Section</Link>
                            <Link className="nav-link" to="/manageenlist">Manage enlist</Link>
                        </div>
                    </div>
                </nav>
    );
}

export default Homepage;
