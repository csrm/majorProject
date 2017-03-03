import React, { Component } from 'react';
import './Update1.css';
import Update1 from './Update';
import SurveyorFeature from './SurveyorFeature';
import Admin from './Admin';
import Navigation from './Navigation';

class ViewFeature extends Component {

  constructor(props){

      super(props);

      this.state={d:[], visible:true, childVisible: true,name:'',descr:'',type:'',state:'',size:'',height:'',area:''};
       var xmlhttp = new XMLHttpRequest();
       var _this = this;
       this.updateClick = this.updateClick.bind(this);
       this.backClick=this.backClick.bind(this);
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


  updateClick(e){
    event.preventDefault();
    this.setState({visible:false, childVisible: true});
}

backClick(e){
  event.preventDefault();
  this.setState({visible:false, childVisible: false});
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
      <h1>{this.state.name}</h1>
      <label>  Name: </label><input type="text" value={this.state.name} />
      <label>  Description:</label> <input type="text" value={this.state.descr} />
      <label>  State:</label> <input type="text" value={this.state.state} />
      <label>  Type:</label> <input type="text" value={this.state.type} />
      <label>  Size:</label> <input type="text" value={this.state.size} />
      <label>  Height: </label><input type="text" value={this.state.height} />
      <label>  Area:</label> <input type="text" value={this.state.area} />
      <button onClick={this.backClick} className="btn btn-skin">back</button>
      </div>

    </div>
    :<div>{this.state.childVisible?<Update1 fid={this.state.fid} sid={this.props.sid} uid={this.props.uid} />:<SurveyorFeature sid={this.props.sid} sid={this.props.sid} userid={this.props.uid} /> }</div>
   }
    </div>
    );
  }
}
export default ViewFeature;
