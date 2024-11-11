import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavBar.css';
import React from 'react';

export default function ScanPageNavbar({ handleSignOut}) {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-md navbar-light container-fluid  justify-content-center noCursor">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav text-center align-items-center">
                    
                    <li className="nav-item">
                        <button className="btn btn-primary lightBlueButton my-3" onClick={handleSignOut}>Unlock</button>
                    </li>
                    
                </ul>
            </div>
        </nav>
        </div>
    );
}
