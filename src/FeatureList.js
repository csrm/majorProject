import React, { Component } from 'react';
import './Admin.css';
import Update from './Update';
import FeatureForm from './FeatureForm';
import Admin from './Admin';

class FeatureList extends Component {

  constructor(props){

      super(props);

      this.state={d:[], visible:true,childVisible:true,fid:'',uid:''};
      var x=this.props.userid;
      //console.log('user id'+x);
      this.setState({uid:x});
       var xmlhttp = new XMLHttpRequest();
       var _this = this;
       xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState === 4) {
           _this.setState({d:JSON.parse(xmlhttp.responseText)});
         }
       };
       var surveyId=this.props.sid;
       xmlhttp.open('GET', 'http://localhost:9000/feature/'+this.props.userid+'/'+surveyId, true);
       //xmlhttp.withCredentials = true;
       xmlhttp.setRequestHeader('Content-type', 'application/json');
       //xmlhttp.setRequestHeader('Accept', 'application/json');
       xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
       xmlhttp.send();
      console.log(this.props.sid);
       this.updateClick = this.updateClick.bind(this);
       console.log(this.state.uid);
  }

  updateClick(e)
  {
    this.setState({visible:false,childVisible:true,fid:e});
  }
  featureClick(e){
    this.setState({visible:false,childVisible:false});
  }



  render() {
    return (
      <div>
      {this.state.visible
      ?<div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>State</th>
            <th>Type</th>
            <th>Size</th>
            <th>Height</th>
            <th>Area</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.d.map((data, key) => {
                   return (
                   <tr key={key}>
                     <td>{data.name}{this.state.uid}</td>
                     <td>{data.descr}</td>
                     <td>{data.state}</td>
                     <td>{data.type}</td>
                     <td>{data.size}</td>
                     <td>{data.height}</td>
                     <td>{data.area}</td>
                     <td>
                       <button onClick={()=>this.updateClick(data.featureId)} className="btn btn-skin">Update</button>
                    </td>
                  </tr>
                   )
          })}
        </tbody>
    </table>
    <br />
    <center>
      <button onClick={()=>this.featureClick()} className="btn btn-skin">Add New Feature</button>
    </center>
    <br /><br />
    </div>
    :<div>
      {this.state.childVisible?
      <Update sid={this.props.sid} fid={this.state.fid} />:<FeatureForm/>}
      </div>
     }
   }
    </div>
    );
  }
}
export default FeatureList;
