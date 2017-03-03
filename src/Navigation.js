import React, { Component } from 'react';
import './css/style.css';
class Navigation extends Component {

  constructor() {
   super();
 }

render() {

    return (
      <div id="navigation">
        <nav className="navbar navbar-custom" role="navigation">
            <div className="row">
              <div className="col-md-2 mob-logo">
                <div className="row">
                <div className="site-logo">
                &nbsp;&nbsp; &nbsp;   <a href="index.html"><img src={require('./img/logo-dark.png')} alt="" /></a>
                </div>
              </div>
            </div>
            <div className="col-md-10 mob-menu ">
              <ul className="nav navbar-nav navbar-right">
                <li><h4>{this.props.uname}</h4> </li>
              <li><a href="index.html">Logout</a></li>  &nbsp;&nbsp; &nbsp;
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
