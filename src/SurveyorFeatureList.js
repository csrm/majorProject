import React, { Component } from 'react';
import './Admin.css';
//import FeatureForm from './FeatureForm';
import Admin from './Admin';

class SurveyorFeatureList extends Component {

  constructor(props){

      super(props);

      this.state={d:[], visible:true, childVisible: true};
       this.deleteClick = this.deleteClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
         this.handleRefreshClick = this.handleRefreshClick.bind(this);
            this.fetchdata = this.fetchdata.bind(this);
            this.fetchdata();
  }

  fetchdata()
  {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        _this.setState({d:JSON.parse(xmlhttp.responseText)});
      }
    };
    xmlhttp.open('GET', 'http://localhost:9000/feature/'+this.props.sid, true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();
  }

  deleteClick(e)
  {
    var x=confirm('are you sure?');
    if(x==true)
    {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    /*  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        _this.setState({d:JSON.parse(xmlhttp.responseText)});
      }
    }; */
    xmlhttp.open('DELETE', 'http://localhost:9000/feature/'+e, true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();

    this.fetchdata();
  //  alert('deleted successfully');
    this.setState({visible:false,childVisible:false});
  }
 }

  handleBackClick()
  {
    this.setState({visible:false, childVisible: true});
  }

  handleRefreshClick()
  {
    this.setState({visible:false, childVisible: false});
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
                     <td>{data.name}</td>
                     <td>{data.descr}</td>
                     <td>{data.type}</td>
                     <td>{data.state}</td>
                     <td>{data.size}</td>
                     <td>{data.height}</td>
                     <td>{data.area}</td>
                    <td><button onClick={()=>this.deleteClick(data.featureId)} className="btn btn-skin">Delete</button></td>
                   </tr>
                   )
          })}
        </tbody>
    </table>
    <br />
    <center>
    <button onClick={this.handleBackClick} className="btn btn-skin">Back</button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button onClick={this.handleRefreshClick} className="btn btn-skin">Refresh</button>
    </center>
    <br /><br />
    </div>
    :<div>{this.state.childVisible?<Admin />:<SurveyorFeatureList sid={this.props.sid} />}</div>
   }
    </div>
    );
  }
}
export default SurveyorFeatureList;
