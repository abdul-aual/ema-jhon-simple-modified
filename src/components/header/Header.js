import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import './header.css';
const Header = () => {
    return (
        <div>
            <div className='header-div'>
                <Link to='/'><img style={{height:'100px'}} src={logo} alt="" /></Link>
            </div>
        </div>
    );
};

export default Header;