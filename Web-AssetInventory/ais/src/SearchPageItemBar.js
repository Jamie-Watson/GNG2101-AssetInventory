import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './SearchPage.css';
import React from 'react';

export default function SearchPageItemBar({handleRemove , handleAdd}){

    return(<nav className="navbar navbar-expand-lg navbar-light justify-content-center container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav justify-content-center text-center">
                <li className="nav-item active mx-5 justify-content-center">
                    <button className="btn btn-primary addRemoveButton my-3" href="#" onClick={handleRemove}>Remove</button>
                </li>
                <li className="nav-item mx-5">
                    <button className="btn btn-primary addRemoveButton my-3" href="#" onClick={handleAdd}>Add</button>
                </li>
            </ul>
        </div>
    </nav>);
}