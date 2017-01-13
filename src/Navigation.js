import React, { Component } from 'react';
import './css/style.css';
class Navigation extends Component {

render() {

    return (
      <div id="navigation">
        <nav class="navbar navbar-custom" role="navigation">
          <div class="container">
            <div class="row">
                <div class="site-logo">
                  <a href="index.html"><img src={require('./img/logo-dark.png')} alt="" /></a>
                </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
