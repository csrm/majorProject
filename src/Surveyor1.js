import React, { Component } from 'react';
import './Admin.css';
import SurveyForm from './SurveyForm';
import FeatureForm from './FeatureForm';
import FeatureList from './FeatureList'
import Login from './Login';
import FForm from './FForm'
class Surveyor1 extends Component {

  constructor(){

      super();
      this.state={data:[],visible:true,sid:''};
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
       this.handleChildClick = this.handleChildClick.bind(this);
  }

  handleChildClick(e)
  {
    this.setState({visible:false});
    var x=e;
    this.setState({sid:x});
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data, key) => {
                     return (
                     <tr key={key}>
                       <td>{data.name}</td>
                       <td>{data.description}</td>
                       <td>{data.state}</td>
                       <td>{data.type}{this.state.uid}</td>
                       <td><button onClick={()=>this.handleChildClick(data.surveyId)} className="btn btn-skin">View</button>  &nbsp; &nbsp;
                       </td>
                     </tr>
                     )
            })}
          </tbody>
      </table>
      <br />
      <p></p>
      <br /><br />
      </div>
      :<div><FeatureList sid={this.state.sid} userid={this.props.uid} /></div>
    }
    </div>
    );
  }
}
export default Surveyor1;
