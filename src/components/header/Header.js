import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <div style={{textAlign:'center'}}>
                <Link to='/'><img style={{height:'100px'}} src={logo} alt="" /></Link>
            </div>
        </div>
    );
};

export default Header;