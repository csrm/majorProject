import React, { Component } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import SomeText from './SomeText';
import Contact from './Contact';
import Cf from './Cf';
//import {Link} from 'react-router';
//import ReactDOM from 'react-dom';
import Login from './Login';
import SignUp from './SignUp';
class Home extends Component {

   constructor() {
    super();
    this.lClick = this.lClick.bind(this);
    this.sClick = this.sClick.bind(this);
    this.state={visible:true,childVisible:false};
  }
  lClick() {
    this.setState({visible:false});
    this.setState({childVisible:true});
  }
sClick(){
    this.setState({visible:false});
    this.setState({childVisible:false});
  }

render() {

var about="In the recent times, organizations, may it be a business or a government department, or local authority, a lot of information\
 will be geographically referenced, the more information you have, the harder it becomes to manage and interet. We generate reports that\
  can be used by the government to analyze and improve the services provided to the general public.";

var contact="You can leave a message here.";

    return (
     <div className="home">
     {this.state.visible
       ? <div>
       <img src={require('./img/pic1.jpg')}  height="550px" width="100%" alt="" className="HomeImage" />
       <div className="bgimg">
            <p className="loginp">SURVEKSHAN</p>
             <br />
            <p className="login-content">A map survey tool</p>
            <div className="form">
          <center>  <button onClick={this.lClick} className="btn btn-skin btn-lg btn-block">login</button><br />
            <button onClick={this.sClick} className="btn btn-skin btn-lg btn-block">Sign Up</button></center>
       </div>
       </div>
         <SomeText title="About" text={about}/>
         <div className="bg-white">
         <Cf />
         </div>
         <SomeText title="Contact Us" text={contact} />
         <Contact /></div>
       :<div> {this.state.childVisible?<Login />:<SignUp />    } </div>
     }
     </div>
    );
  }
}

export default Home;
