import React, { Component } from 'react';
//import './App.css';
//import Surveyor1 from './Surveyor1';
import SurveyorList from './SurveyorList';
import Admin1 from './Admin1';
import './Login.css';
class Login extends Component {
  constructor(props){
  super(props);
  this.state={data:'', passwd:'',message:'',visible:true,child:false,uid:'',uname:''};
  this.updateState=this.updateState.bind(this);
  this.updatePasswd=this.updatePasswd.bind(this);
  //  this.validate=this.validate.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

updateState(e){
   this.setState({data:e.target.value});
}

updatePasswd(e){
  this.setState({passwd:e.target.value});
}

/*validate(username,password){
  if((username=='abc')&&(password=='123'))
     this.setState({res:'VALID, Login Successful'});
  else {
     this.setState({res:'Invalid Username and Password'});
  }
}*/

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
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
      //  var response = xmlhttp.responseText;

        if (xmlhttp.status === 200) {

          _this.setState({visible:false});
          if(JSON.parse(xmlhttp.responseText).role==='surveyor')
            _this.setState({ child:true });
          else if(JSON.parse(xmlhttp.responseText).role==='admin')
            _this.setState({ child:false });
            var x=JSON.parse(xmlhttp.responseText).userId;
            var y=JSON.parse(xmlhttp.responseText).userName;
            _this.setState({uid:x, uname:y});
            console.log(_this.state.uid);
        }
        else if(xmlhttp.status===401) {
          _this.setState({ message: 'Invalid user' });
        }
        console.log(_this.state.message);
      }
    };
    xmlhttp.open('POST', 'http://localhost:9000/users', true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send(JSON.stringify(formData));

}

render()
{
  return(
    <div>
    {this.state.visible
    ?<div className="form-container">
	<section id="content">
		<form onSubmit={this.handleSubmit}>
			<h1>Login Form</h1>
      <div>
        <img src={require('./img/user_login.ico')} alt="" width="200px" height="200px" />
			</div>
      <div>
				<input type="text" placeholder="Username" required="" id="username"  value={this.state.data}
         onChange={this.updateState} />
			</div>
			<div>
				<input type="password" placeholder="Password" required="" id="password"   value={this.state.passwd}
          onChange={this.updatePasswd} />
			</div>
			<div>
				<input type="submit" value="Log in" />
          <p>{this.state.message}</p>
			</div>
		</form>
	</section>
</div>
    : <div>{ this.state.child? <SurveyorList uid={this.state.uid} uname={this.state.uname} /> : <Admin1 uid={this.state.uid} uname={this.state.uname}  /> }</div>
   }
   </div>
   );

}

}

export default Login;
