import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './App.css';

const Leftbar = () => {
  return (
    <div id='leftbar' className="leftbar">
      <div className="sidebar-item">
        <img src='logo.png' alt='logo'/>
      </div>
      <div className="sidebar-item">
        <Link to="/home" className='link-tag'><span><FontAwesomeIcon icon={faHome} /></span></Link>
      </div>
      <div className="sidebar-item">
      <Link to="/inbox" className='link-tag'><span><FontAwesomeIcon icon={faEnvelope} /></span></Link>
      </div>
      <div className="sidebar-item">
      <Link to="/noti" className='link-tag'><span><FontAwesomeIcon icon={faBell} /></span></Link>
      </div>
      <div className="sidebar-item">
      <Link to="/profile" className='link-tag'><span><FontAwesomeIcon icon={faUser} /></span></Link>
      </div>
    </div>
  );
};

export default Leftbar;
