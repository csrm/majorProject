import React, { Component } from 'react';

import Loc from './loc';
import './Login1.css';
import SurveyorFeature from './SurveyorFeature';

class FeatureForm extends Component {

  constructor(){
    super();
    this.state = {name: '',type: '',state: '',description: '',size: '', height: '',area: '',lat:'',lng:'', res:'',v:true, file: '',imagePreviewUrl: '',imageID:null};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageSubmit=this.handleImageSubmit.bind(this);
    this.onPropsHandle=this.onPropsHandle.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }

/*  handleBackClick()
  {
    this.setState({visible: false });
  } */
  handleClose(e){
    this.setState({v:false});
  }

  onPropsHandle(x,y)
  {
    this.setState({lat:x,lng:y});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleStateChange(event) {
    this.setState({state: event.target.value});
  }

  handleSizeChange(event) {
    this.setState({size: event.target.value});
  }

  handleHeightChange(event) {
    this.setState({height: event.target.value});
  }

  handleAreaChange(event) {
    this.setState({area: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

  var formData = {

    name: this.state.name,
    descr:this.state.description,
    type:this.state.type,
    state: this.state.state,
    size: this.state.size,
    height: this.state.height,
    area: this.state.area,
    image: this.state.imageID,
    userId: this.props.uid,
    surveyId: this.props.sid,
    //Survey_Id: this.props.sid,
    latitude: this.state.lat,
    longitude: this.state.lng
  };
 console.log(this.props.uid);
var xmlhttp = new XMLHttpRequest();
var _this = this;
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4) {
    var response = xmlhttp.responseText;
    console.log('hi');
    _this.setState({v:false});

    if (xmlhttp.status == 201 || response.status == 'Created') {
      _this.setState({ message: 'Success: We have received your message and will get in touch shortly. Thanks!' });
      console.log(xmlhttp.status);
      console.log(_this.state.message);
    }
    else {
      _this.setState({ message: 'Danger!!!Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
    }
  }
};
xmlhttp.open('POST', 'http://localhost:9000/feature/'+this.props.sid, true);
//xmlhttp.withCredentials = true;
xmlhttp.setRequestHeader('Content-type', 'application/json');
//xmlhttp.setRequestHeader('Accept', 'application/json');
xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
xmlhttp.send(JSON.stringify(formData));

  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
       this.setState({
         file: file,
         imagePreviewUrl: reader.result
       });
    }
    reader.readAsDataURL(file)
    console.log(e.target.files);
  }

  handleImageSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append(
      "image",
      this.state.file
    );
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
     _this.setState({imageID:JSON.parse(xmlhttp.responseText)});
      }
    };
    xmlhttp.open('POST', 'http://localhost:9000/images', true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Accept', '*/*');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send(formData);
    console.log('handle uploading-', this.state.file);
  }


  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    return (
      <div className="Root">
      {this.state.v
      ?<div className="App">
      <div className="header">
      <div className="form1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <button className="close" onClick={this.handleClose}><i className="fa fa-window-close-o" aria-hidden="true"></i></button>
      <div className="wrap">
        <div className="Location">
         <Loc onPropsHandle={this.onPropsHandle}/>
         </div>
        <div className="fields">
        <h1>FEATURE FORM</h1>
        <form onSubmit={this.handleSubmit}>
           <input type="text" value = {this.state.name}
           onChange = {this.handleNameChange}  placeholder="Name"/>
           <input type="text" value = {this.state.description}
           onChange = {this.handleDescriptionChange} placeholder="Feature Description"/>
           <input type="text" value = {this.state.type}
           onChange = {this.handleTypeChange}  placeholder="Feature Type"/>
           <input type="text"  value = {this.state.state}
           onChange = {this.handleStateChange} placeholder="State" />
          <input type="text" value = {this.state.size}
          onChange = {this.handleSizeChange} placeholder="Feature size"/>
          <input type="text" value = {this.state.height}
          onChange = {this.handleHeightChange} placeholder="Feature Height"/>
          <input type="text" value = {this.state.area}
          onChange = {this.handleAreaChange}  placeholder="Area of the Feature"/>

          <div className="previewComponent">
            <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
            <button className="submitButton" onClick={(e)=>this.handleImageSubmit(e)}>Upload Image</button>
            <p>{this.state.imageID}</p>
            <div className="imgPreview">{$imagePreview}</div>
          </div>

          <button type="submit" >Create</button>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        :<SurveyorFeature userid={this.props.uid} sid={this.props.sid} />
      }
        </div>

    );
  }
}

export default FeatureForm;
