import logo from './logo.jpg';
import React from 'react';

function Header(){
return(
    <h1 style={{background: '#333232'}}>
        <img src={logo} height='60px' ></img>
        </h1>
)
}
export default Header;