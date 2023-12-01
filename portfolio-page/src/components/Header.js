import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
      <header className="main-header">
      <h1 className="logo">My Portfolio</h1>
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink exact to="/" activeClassName="active-link" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/projects" activeClassName="active-link" className="nav-link">Projects</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" activeClassName="active-link" className="nav-link">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    );
  }

export default Header;