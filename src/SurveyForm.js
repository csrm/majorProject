/*  Creating a new Survey Form  */

import React, { Component } from 'react';
import './Update1.css';
import './Login.css';
import Admin1 from './Admin1';
import Navigation from './Navigation';

class SurveyForm2 extends Component{

  constructor(){
    super();
    this.state = {name: '',type: '',stateT: '',description: '',res:'',visible:true, file: '',imagePreviewUrl: '',imageID:null};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageSubmit=this.handleImageSubmit.bind(this);
    this.handleBackClick=this.handleBackClick.bind(this);
  }

  handleBackClick(e){
    this.setState({visible:false});
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
    this.setState({stateT: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

  var formData = {

    name: this.state.name,
    description:this.state.description,
    type:this.state.type,
    state: this.state.stateT,
    image: this.state.imageID
  };
   console.log(this.state.file);
  var xmlhttp = new XMLHttpRequest();
  var _this = this;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      var response = xmlhttp.responseText;
      if (xmlhttp.status == 201 || response.status == 'Created') {
        _this.setState({ message: 'Success: We have received your message and will get in touch shortly. Thanks!' });
        console.log(xmlhttp.status);
        console.log(_this.state.message);
      }
      else{
      _this.setState({ message: 'Danger!!!Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
      }
    }
  };
  xmlhttp.open('POST', 'http://localhost:9000/surveys', false);
//xmlhttp.withCredentials = true;
  xmlhttp.setRequestHeader('Content-type', 'application/json');
//xmlhttp.setRequestHeader('Accept', 'application/json');
  xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
  xmlhttp.send(JSON.stringify(formData));
  _this.setState({visible:false});
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

  render()
  {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div>
      {this.state.visible
      ?<div>
       <Navigation uname={this.props.uname} />
      <div className="update-form">
  	   <div className="elegant-aero">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <button className="close" onClick={this.handleBackClick}><i className="fa fa-window-close-o" aria-hidden="true"></i></button>
        <form action="" onSubmit={this.handleSubmit} >
        <h1>CREATE SURVEY</h1>
            <div>
            <input name="name" required type="text" value = {this.state.name}
            onChange = {this.handleNameChange} placeholder="Survey Name"/>
            </div>
            <div>
            <input name="description" required type="text" value = {this.state.description}
            onChange = {this.handleDescriptionChange} placeholder="Description"/>
            </div>
            <div>
            <input name="type" required type="text" value = {this.state.type}
            onChange = {this.handleTypeChange} placeholder="Type"/>
            </div>
            <div>
            <input name="state" required type="text" value = {this.state.stateT}
            onChange={this.handleStateChange} placeholder="State"/>
            </div>
            <div>
            <div className="previewComponent">
              <input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} />
            </div>
            <div>
              <button className="submitButton" onClick={(e)=>this.handleImageSubmit(e)}>Upload Image</button>
            </div>
              <div>{this.state.imageID}</div>
              <div className="imgPreview">{$imagePreview}</div>
            </div>
            <div>
            <button type="submit">Add Survey</button>
            </div>
        </form>
        </div>
        </div>
        </div>
        :<Admin1 uname={this.props.uname} />
      }
      </div>
    );
  }
}

export default SurveyForm2;
