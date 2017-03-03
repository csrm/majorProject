import React, { Component } from 'react';
import './css/style.css';
class Header extends Component {

render() {
    return (
    <div>
    <img src={require('./img/pic1.jpg')}  height="500px" width="100%" alt="" />
    <div className="bgimg">
         <p className="loginp">SURVEKSHAN</p>
          <br />
         <p className="login-content">A map survey tool</p>
    </div>
  </div>
    );
  }
}

export default Header;
