import React, { Component } from 'react';
import './Update1.css';
//import './Login.css';
import SurveyorFeature from './SurveyorFeature';
import Admin from './Admin';
import Navigation from './Navigation';

class Update1 extends Component {

  constructor(props){

      super(props);

      this.state={d:[], visible:true, childVisible: true,name:'',descr:'',type:'',state:'',size:'',height:'',area:''};
       var xmlhttp = new XMLHttpRequest();
       var _this = this;
       this.updateClick = this.updateClick.bind(this);
       this.handleNameChange=this.handleNameChange.bind(this);
       this.handleDescrChange=this.handleDescrChange.bind(this);
       this.handleStateChange=this.handleStateChange.bind(this);
       this.handleTypeChange=this.handleTypeChange.bind(this);
       this.handleSizeChange=this.handleSizeChange.bind(this);
       this.handleHeightChange=this.handleHeightChange.bind(this);
       this.handleAreaChange=this.handleAreaChange.bind(this);
       xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState === 4) {
           _this.setState({d:JSON.parse(xmlhttp.responseText)});
           console.log(_this.state.d.name);
           _this.setState({name:_this.state.d.name});
          _this.setState({descr:_this.state.d.descr});
           _this.setState({state:_this.state.d.state});
           _this.setState({type:_this.state.d.type});
           _this.setState({size:_this.state.d.size});
           _this.setState({height:_this.state.d.height});
           _this.setState({area:_this.state.d.area});
           _this.setState({fid:_this.state.d.featureId});
         }
       };
       var featureId=this.props.fid;
       xmlhttp.open('GET', 'http://localhost:9000/features/'+featureId, true);
       //xmlhttp.withCredentials = true;
       xmlhttp.setRequestHeader('Content-type', 'application/json');
       //xmlhttp.setRequestHeader('Accept', 'application/json');
       xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
       xmlhttp.send();
      console.log(this.props.sid);
  }
  handleNameChange(e)
  {
     this.setState({name:e.target.value});
  }
  backClick(e){
    this.setState({visible:false});
  }
  handleDescrChange(e)
  {
     this.setState({descr:e.target.value});
  }
  handleStateChange(e)
  {
     this.setState({state:e.target.value});
  }
  handleTypeChange(e)
  {
     this.setState({type:e.target.value});
  }
  handleSizeChange(e)
  {
     this.setState({size:e.target.value});
  }
  handleHeightChange(e)
  {
     this.setState({height:e.target.value});
  }
  handleAreaChange(e)
  {
     this.setState({area:e.target.value});
  }

  updateClick(e){
    event.preventDefault();

    var formData = {
    name: this.state.name,
    descr:this.state.descr,
    type:this.state.type,
    state: this.state.state,
    size: this.state.size,
    height: this.state.height,
    area: this.state.area
   };
   console.log(formData); console.log(formData.length);
   var xmlhttp = new XMLHttpRequest();
   var _this = this;
   xmlhttp.onreadystatechange = function() {
   if (xmlhttp.readyState == 4) {
    var response = xmlhttp.responseText;
    if (xmlhttp.status == 200 || response.status == 'OK') {
       _this.setState({ message: 'Success: We have received your message and will get in touch shortly. Thanks!' });
       console.log(xmlhttp.status);
       console.log(_this.state.message);
     }
    else {
       _this.setState({ message: 'Danger!!!Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
     }
   }
 };
 xmlhttp.open('PUT', 'http://localhost:9000/feature/'+this.props.fid, true);
 //xmlhttp.withCredentials = true;
 xmlhttp.setRequestHeader('Content-type', 'application/json');
 xmlhttp.setRequestHeader('Accept', 'application/json');
 xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
 //xmlhttp.setRequestHeader('Content-length', formData.length);
 xmlhttp.send(JSON.stringify(formData));
 _this.setState({visible:false});

}

  render() {
    return (
      <div>
      {this.state.visible
      ?<div className="update-form">
      <Navigation uname={this.props.uname} />
      <div className="elegant-aero">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <button className="close" onClick={this.backClick}><i className="fa fa-window-close-o" aria-hidden="true"></i></button>
      <form>
          <h1>{this.state.name}</h1>
          <label>Description:</label> <input type="text" value={this.state.descr} onChange={this.handleDescrChange}/><br />
          <label>State:</label> <input type="text" value={this.state.state} onChange={this.handleStateChange}/><br />
          <label>Type:</label> <input type="text" value={this.state.type} onChange={this.handleTypeChange}/><br />
          <label>Size:</label><input type="text" value={this.state.size} onChange={this.handleSizeChange}/><br />
          <label>Height:</label> <input type="text" value={this.state.height} onChange={this.handleHeightChange}/><br />
          <label>Area:</label> <input type="text" value={this.state.area} onChange={this.handleAreaChange}/><br />
          <button onClick={this.updateClick}  className="btn btn-skin">Update</button><br />
        </form>
      </div>
    </div>
    :<div><SurveyorFeature sid={this.props.sid} userid={this.props.uid} /></div>
   }
    </div>
    );
  }
}
export default Update1;
