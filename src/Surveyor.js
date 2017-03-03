import React, { Component } from 'react';
import './Admin.css';
import SurveyForm from './SurveyForm';
import FeatureForm from './FeatureForm';
import Login from './Login';
class Admin extends Component {

  constructor(){

      super();

      this.state={data:[],visible:true,childVisible:true};
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

       this.handleClick = this.handleClick.bind(this);
       this.handleChildClick = this.handleChildClick.bind(this);
  }

  handleClick(e)
  {
    this.setState({visible:false});
  }

  handleChildClick(e)
  {
    this.setState({childVisible:false, visible:false});
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
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data, key) => {
                     return (
                     <tr key={key}>
                       <td>{data.name}</td>
                       <td>{data.description}</td>
                       <td>{data.type}</td>
                       <td>{data.state}</td>
                     </tr>
                     )
            })}
          </tbody>
      </table>
      <br />
      <center><button onClick={this.handleClick} className="btn btn-skin">Add</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={this.handleChildClick} className="btn btn-skin">Refresh</button></center>
      <p>{this.props.uid}</p>
      <br /><br />
      </div>
      :<div>{this.state.childVisible?<SurveyForm />:<Admin />}</div>
    }
    </div>
    );
  }
}
export default Admin;
