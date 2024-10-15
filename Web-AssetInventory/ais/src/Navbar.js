import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavBar.css';
import React from 'react';
export default function Navbar({username}){

    return(<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center container-fluid" style={{}}>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav justify-content-center text-center">
                <li className="nav-item active mx-5 justify-content-center">
                    <button className="btn btn-primary lightBlueButton my-2" href="#" onClick={handleSignInClick}>Sign In/Out Items</button>
                </li>
                <li className="nav-item mx-5">
                    <button className="btn btn-primary lightBlueButton my-2" href="#" onClick={handleSignInClick}>Search</button>
                </li>
                <li className="nav-item mx-5">
                    <button className="btn btn-primary lightBlueButton my-2" href="#" onClick={handleSignInClick}>Scan</button>
                </li>
            </ul>
        </div>
    </nav>);
}

function handleSignInClick(){
    return;
}