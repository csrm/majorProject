import React, { Component } from 'react';
//import Navigation from './Navigation';
import Login from './Login';
import SomeText from './SomeText';
import Contact from './Contact';

class Home extends Component {

render() {

var about="In the recent times, organizations, may it be a business or a government department, or local authority, a lot of information\
 will be geographically referenced, the more information you have, the harder it becomes to manage and interet. We generate reports that\
  can be used by the government to analyze and improve the services provided to the general public.";

var contact="You can leave a message here.";

    return (
     <div className="home">
        <Login />
        <SomeText title="About" text={about}/>
        <SomeText title="Contact Us" text={contact} />
        <Contact />
     </div>
    );
  }
}

export default Home;
