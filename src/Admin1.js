// List of surveys displayed on Surveyor's Side

import React, { Component } from 'react';
//import Image from './ImageRender.js';
import SomeText from './SomeText';
import Features from './Features';
import Navigation from './Navigation';
import SurveyForm from './SurveyForm';
import './Surveyor.css';
import 'bootstrap/dist/css/bootstrap.css';

class Admin1 extends Component{

  constructor(){

    super();
    this.state = {data:[],surveys:[],visible:true, childVisible:true, surveyName:null,sid:0,uid:0,images:["pic1.jpg",
    "hospital.png",
    "parks.png",
    "ShoppingMall.png",
    "Temple.png"]};

    this.handleFeatureClick=this.handleFeatureClick.bind(this);
    this.deleteClick=this.deleteClick.bind(this);
    this.fetchdata=this.fetchdata.bind(this);
    this.handleAddClick=this.handleAddClick.bind(this);
  //  this.createImage=this.createImage.bind(this);


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

    componentDidMount()
    {
      this.fetchdata();
    }

  handleFeatureClick(e,name){

    this.setState({sid:e,visible:false,childVisible:true, surveyName:name});
    console.log("Executed");
  }

  deleteClick(e)
  {
    var x=confirm('are you sure?');
    if(true==x)
    {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.open('DELETE', 'http://localhost:9000/features/'+e, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();

    var req = new XMLHttpRequest();
    req.open('DELETE', 'http://localhost:9000/surveys/'+e, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    req.send();
  }
  }

  handleAddClick()
  {
    this.setState({visible: false, childVisible:false});
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
      ?<div>
      <Navigation uname={this.props.uname} />
        <div className="tbContainer">
        <SomeText title="SURVEYS" text="These are available surveys." />
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
                                       <button onClick={()=>this.handleFeatureClick(data.surveyId,data.name)} className="btn btn-skin">VIEW </button>&nbsp;&nbsp;&nbsp;
                                       <button onClick={()=>this.deleteClick(data.surveyId)} className="btn btn-skin">DELETE</button>
                                     </div>
                                   </div>
                                 </div>
                                 <br/>
                      </div>
                     )
            })}
            <br/>
            </tbody>
          </table>
      <br />
      <center>
      <button onClick={this.handleAddClick} className="btn btn-skin">Add</button>
      </center>
      <br /><br />
      </div>
      </div>
      :<div>
      {
        this.state.childVisible?<div><Features sid={this.state.sid} uname={this.props.uname} /></div>
                      :<SurveyForm uname={this.props.uname} />
      }
      </div>
    }
    </div>
    );
  }
}
export default Admin1;
