import React, { Component } from 'react';
import './css/style.css';
class Login extends Component {

render() {

    return (
    <div>
    <img src={require('./img/pic1.jpg')}  height="500px" width="100%" alt="" />
    <div className="bgimg">
     <table width="100%">
       <tr>
         <td width="50%">
         <p className="loginp">SURVEKSHAN</p>
          <br />
         <p className="login-content">A map survey tool</p>
           <div className="form">
            <form className="login-form">
              <button className="btn btn-skin btn-lg btn-block">login</button>
              <br /><br />
              <button className="btn btn-skin btn-lg btn-block">Apply now</button>
            </form>
          </div>
      </td>
    </tr>
  </table>
  </div>
  </div>
    );
  }
}

export default Login;
