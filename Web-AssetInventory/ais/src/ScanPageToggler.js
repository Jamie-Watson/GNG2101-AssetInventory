import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './SearchPage.css';
import React from 'react';

export default function ScanPageToggler({handleSignItemIn , handleSignItemOut, isSignIn}){

    return(<nav className="navbar navbar-expand-lg navbar-light justify-content-center container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSearch">
            <ul className="navbar-nav justify-content-center text-center">
                <li className="nav-item active mx-5 justify-content-center">
                    <button className="btn btn-primary addRemoveButton my-3" href="#" onClick={handleSignItemIn}>Sign In Items</button>
                </li>
                <li className="nav-item active mx-5 justify-content-center">
                    <button className="btn btn-primary addRemoveButton my-3" href="#" onClick={handleSignItemOut}>Sign Out Items</button>
                </li>
            </ul>
        </div>
    </nav>);
}