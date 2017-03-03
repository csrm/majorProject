// List of surveys displayed on Surveyor's Side

import React, { Component } from 'react';
//import Image from './ImageRender.js';
import SurveyorFeature from './SurveyorFeature';
import SomeText from './SomeText';
import './Surveyor.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';

class SurveyorList extends Component{

  constructor(){

    super();
    this.state = {data:[],surveys:[],visible:true, childVisible:true, surveyName:null,sid:0,uid:0,images:["pic1.jpg",
    "hospital.png",
    "parks.png",
    "ShoppingMall.png",
    "Temple.png"]};

    this.handleFeatureClick=this.handleFeatureClick.bind(this);
      this.fetchdata=this.fetchdata.bind(this);
  //  this.createImage=this.createImage.bind(this);
    this.fetchdata();
  }

  fetchdata()
  {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
     _this.setState({data:JSON.parse(xmlhttp.responseText)});
      }
    };
    xmlhttp.open('GET', 'http://localhost:9000/surveys', true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();
  }

/*  componentWillUpdate() {
    this.fetchdata();
  } */

  handleFeatureClick(e,name){

    this.setState({sid:e,visible:false, surveyName:name});
    console.log("Executed");
  }

  // createImage(image) {
  //   // let style = {
  //   //   width: '500px',
  //   //   height: '300px',
  //   //
  //   // };
  //   // console.log(image);
  //   // return (<div> <img src={require('./img/'+image)} style={style} alt="kit" key={image}/> </div>);
  //
  // //  nRow++;
  //   //  if(nRow<3 && nRow!=1){
  //
  //       return (<Image source={image} key={this.state.data.surveyId} clickSurvey={()=>this.handleFeatureClick(this.state.data.surveyId,this.state.data.surveyName)} surveyName={this.state.data.surveyName}/>);
  //     //}
  //     // else if(nRow==3){
  //     //   return (<div><Image source={image} key={image}/></div>);
  //     // }
  //   //   else {
  //   //     nRow=1;
  //   //     return (<div><Image source={image} key={image} /></div>);
  //   // }
  // }
  //
  // createImages(images) {
  //   return images.map(this.createImage);
  // }

  render(){
    let source='./img/';
    let style = {
      // height:'300px',
      // width: '500px',
      // margin: '10px 5px 0px 5px',
      // padding: '5px',
      // position:'relative'
      position:'absolute',
      margin: '10px 5px 0px 5px',
      padding: '5px',
      width:'300px',
      height:'200px',

    };

    return(
      <div>
      {this.state.visible
      ?<div><Navigation uname={this.props.uname} /><div className="tbContainer">
      <SomeText title="SURVEYS" text="These are the available surveys." />
        <table>
          <tbody>
            {this.state.data.map((data, key) => {
                    return (
                       <div className="col-md-4" key={key}>
                                 <div className="list_block">
                                   <div className="survey">
                                     <img src={data.image} style={style} className="img-responsive"/>
                                     <p className="surveyTitle">{data.name}</p>
                                     <div className="overlay"></div>
                                     <div className="featureButton">
                                       <p>{data.description} </p>
                                       <button onClick={()=>this.handleFeatureClick(data.surveyId,data.name)} className="btn btn-skin">VIEW FEATURES</button>
                                     </div>
                                   </div>
                                 </div>
                                 <br />
                      </div>
                     )
            })}
            <br/>
          </tbody>
      </table>
      <br/>
      </div>
      </div>
      :<SurveyorFeature sid={this.state.sid} uname={this.props.uname} userid={this.props.uid} surveyName={this.state.surveyName} />
     }</div>
    );
  }

 }
export default SurveyorList;
