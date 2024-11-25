import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ username, handleSignOut }) {
  const navigate = useNavigate();

  const handleNavigateToSearch = () => navigate('/search');
  const handleNavigateToScan = () => navigate('/scan');

  return (
    <nav className="navbar navbar-expand-lg navbar-light container-fluid d-flex justify-content-center noCursor">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav text-center align-items-center">
          <li className="nav-item mx-3">
            <span className="navbar-brand">{username}</span>
          </li>
          <li className="nav-item mx-3">
            <button
              className="btn btn-primary lightBlueButton my-3"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
          <li className="nav-item mx-3">
            <button
              className="btn btn-primary lightBlueButton my-3"
              onClick={handleNavigateToSearch}
            >
              Search/Edit
            </button>
          </li>
          <li className="nav-item mx-3">
            <button
              className="btn btn-primary lightBlueButton my-3"
              onClick={handleNavigateToScan}
            >
              Scan
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
