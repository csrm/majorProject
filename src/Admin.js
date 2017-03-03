import React, { Component } from 'react';
import './Admin.css';
import SurveyForm from './SurveyForm';
import SurveyorFeatureList from './SurveyorFeatureList';
import Login from './Login';
import Features from './Features';
class Admin extends Component {

  constructor(){

      super();

      this.state={data:[],visible:true,childVisible:false,sid:0,view:true};
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
       this.viewClick = this.viewClick.bind(this);
       this.deleteClick = this.deleteClick.bind(this);
  }

  handleClick(e)
  {
    this.setState({visible:false, view:false, childVisible:true});
  }

  handleChildClick(e)
  {
    this.setState({childVisible:false, visible:false, view:false});
  }

  viewClick(e)
  {
    this.setState({sid:e,visible:false, view:true});
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
                       <td>{data.type}</td>
                       <td>{data.state}</td>
                       <td><button onClick={()=>this.viewClick(data.surveyId)} className="btn btn-skin">View</button>  &nbsp; &nbsp;
                       <button onClick={()=>this.deleteClick(data.surveyId)} className="btn btn-skin">Delete</button></td>
                     </tr>
                     )
            })}
          </tbody>
      </table>
      <br />
      <center>
      <button onClick={this.handleClick} className="btn btn-skin">Add</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={this.handleChildClick} className="btn btn-skin">Refresh</button>
      </center>
      <br /><br />
      </div>
      :<div>
      {
        this.state.view?<div><Features sid={this.state.sid} /></div>
                      :<div>{this.state.childVisible?<SurveyForm />:<Admin />}</div>
      }
      </div>
    }
    </div>
    );
  }
}
export default Admin;
