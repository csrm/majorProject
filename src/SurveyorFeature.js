// List of surveys displayed on Surveyor's Side

import React, { Component } from 'react';
//import Image from './ImageRender.js';
import ViewFeature from './ViewFeature';
import FeatureForm from './FeatureForm';
import SomeText from './SomeText';
import Update1 from './Update';
import SurveyorList from './SurveyorList';
import Navigation from './Navigation';
import './Surveyor.css';
import 'bootstrap/dist/css/bootstrap.css';

class SurveyorFeature extends Component{

  constructor(props){

    super(props);
    this.state = {data:[],back:false,surveys:[],visible:true, childVisible:true,view:true,sid:0,uid:0,images:["pic1.jpg",
    "hospital.png",
    "parks.png",
    "ShoppingMall.png",
    "Temple.png"]};

    this.handleFeatureClick=this.handleFeatureClick.bind(this);
    this.updateClick=this.updateClick.bind(this);
    this.fetchdata=this.fetchdata.bind(this);
    this.handleAddClick=this.handleAddClick.bind(this);
    this.fetchdata();
    this.handleBackClick=this.handleBackClick.bind(this);
  //  this.createImage=this.createImage.bind(this);
  }

  fetchdata()
    {
      var xmlhttp = new XMLHttpRequest();
      var _this = this;
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
       _this.setState({data:JSON.parse(xmlhttp.responseText)});
           console.log(_this.state.data);
        }
      };
      var surveyId=this.props.sid;
      console.log(this.props.userid+'/'+this.props.sid)
      console.log(this.state.data);
      xmlhttp.open('GET', 'http://localhost:9000/surveyF/'+this.props.sid, true);
      //xmlhttp.withCredentials = true;
      xmlhttp.setRequestHeader('Content-type', 'application/json');
      //xmlhttp.setRequestHeader('Accept', 'application/json');
      xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
      xmlhttp.send();
          console.log(this.state.data);
    }

    handleFeatureClick(e){

    this.setState({fid:e,visible:false,childVisible:true});
    console.log("Executed");
  }

  handleBackClick(e){
    this.setState({visible:false,back:true});
  }

  updateClick(e)
  {
    this.setState({visible:false,childVisible:false,view: true, fid:e});
  }

  handleAddClick()
  {
    this.setState({visible: false, childVisible:false, view:false});
  }

  componentDidMount()
  {
    console.log('executing this');
    this.fetchdata();
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
      ?
      <div><Navigation uname={this.props.uname} /><div className="tbContainer">
      <SomeText title="FEATURES" text="These are features added to the survey." />
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
                                       <p>{data.descr} </p>
                                       <button onClick={()=>this.handleFeatureClick(data.featureId)} className="btn btn-skin">VIEW </button>&nbsp;&nbsp;&nbsp;
                                       <button onClick={()=>this.updateClick(data.featureId)} className="btn btn-skin">update</button>
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
      <br />
      <center>
      <button onClick={this.handleAddClick} className="btn btn-skin">Add</button>&nbsp;&nbsp;&nbsp;
        <button onClick={this.handleBackClick} className="btn btn-skin">Back</button>
      </center>
      <br /><br />
      </div></div>
      :<div>
      {this.state.back?<SurveyorList uid={this.props.userid} uname={this.props.uname}/>
        :<div>{this.state.childVisible?<ViewFeature fid={this.state.fid } uid={this.props.userid} sid={this.props.sid} uname={this.props.uname}/>
                      :<div>{this.state.view?<Update1 fid={this.state.fid} uid={this.props.userid} sid={this.props.sid} uname={this.props.uname}/> :<FeatureForm uid={this.props.userid} sid={this.props.sid} uname={this.props.uname}/> }</div>
        }
        </div>
      }
      </div>
    }
    </div>
    );
  }
}
export default SurveyorFeature;
