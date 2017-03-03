import React, { Component } from 'react';
import Login from './Login';
import './Login.css';
class SignUp extends Component {
  constructor(props){
  super(props);
  this.state={data:'', passwd:'',message:'',rpasswd:'',visible:true};
  this.updateState=this.updateState.bind(this);
  this.updatePasswd=this.updatePasswd.bind(this);
  this.confPasswd=this.confPasswd.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

updateState(e){
   this.setState({data:e.target.value});
}

updatePasswd(e){
  this.setState({passwd:e.target.value});
}

confPasswd(e){
  this.setState({rpasswd:e.target.value});
}

handleSubmit(event){
  event.preventDefault(); //
  // Scroll to the top of the page to show the status message.
  //document.getElementById('heading').scrollIntoView();
//  this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);

var formData = {

  userName: this.state.data,
  password:this.state.passwd,
  role:'surveyor'
  // name: React.findDOMNode(this.refs.name).value,
  // description: React.findDOMNode(this.refs.description).value,
  // type: React.findDOMNode(this.refs.type).value,
  // state: React.findDOMNode(this.refs.state).value,
};
/*fetch('http://localhost:9000/hello', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': 'no-cors',
       },
       body: JSON.stringify(formData)
    /*   ({
         firstName: 'yourValue',
         secondParam: 'yourOtherValue',
       })
     }).then((response) => console.log(response.status)
   );
     console.log("hello");
      /* .then((responseJson) =>
       { console.log(responseJson.firstName);return responseJson.firstName;})
       .catch((error) => {
        console.error(error);
    });*/
  if(this.state.passwd == this.state.rpasswd)
  {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
      //  var response = xmlhttp.responseText;

        if (xmlhttp.status === 201) {
          _this.setState({visible:false});
        }
        else {
          _this.setState({ message: 'Registration failed' });
        }
        console.log(_this.state.message);
      }
    };
    xmlhttp.open('POST', 'http://localhost:9000/user', true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send(JSON.stringify(formData));
  }
  else {
    this.setState({message: 'Password does not match'});
  }
}

render()
{
  return(
    <div>
    {this.state.visible
    ?<div className="form-container">
	   <section id="content">
    <form action="" onSubmit={this.handleSubmit}>
    <h1>  Register</h1>
    <div>
    <input type="text" placeholder="Username" id="username"
           value={this.state.data}
           onChange={this.updateState}/>
    </div>
    <div>
    <input type="password"  placeholder="Password" id="password"
            value={this.state.passwd}
            onChange={this.updatePasswd}  />
    </div>
    <div>
    <input type="password"  placeholder="Re-Enter Password" id="password"
            value={this.state.rpasswd}
            onChange={this.confPasswd}  />
    </div>

    <div>
    <input type="submit" value="Sign Up" />
    <p>{this.state.message}</p>
    </div>

    </form>
    </section>
    </div>
    : <Login />
   }
   </div>
   );

}

}

export default SignUp;
