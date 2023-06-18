import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
       <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/Home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Listings">
              Listings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Cart">
              Cart
            </Link>
          </li>
          
        </ul>
      </div>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
