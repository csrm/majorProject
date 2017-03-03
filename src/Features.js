import React, { Component } from 'react';
import './Features.css';
import Admin1 from './Admin1';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon, marker} from 'leaflet';
import './MapExample.css';
import FeatureDetail from './FeatureDetail';
import FontAwesome from 'react-fontawesome';
import Navigation from './Navigation';

class Features extends Component {

  constructor(props){

      super(props);

      this.state={d:[], fdata:{}, visible:true, childVisible: true, lat: 17, lng: 18, zoom: 13};

      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });

    /*  this.showPosition=this.showPosition.bind(this);
      this.getPosition=this.getPosition.bind(this);
      this.mdrag=this.mdrag.bind(this);
      this.getPosition();  */

      this.deleteClick = this.deleteClick.bind(this);
      this.handleBackClick = this.handleBackClick.bind(this);
      this.handleViewClick = this.handleViewClick.bind(this);
      this.fetchdata = this.fetchdata.bind(this);
      //this.fetchdata();
  }

/*  mdrag(e)
  {
    this.setState({x: e.target.getLatLng()});
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
  this.setState({lat:position.coords.latitude, lng:position.coords.longitude});
}  */

  fetchdata()
  {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        _this.setState({d:JSON.parse(xmlhttp.responseText)});
        //console.log(_this.state.d);
      }
    };
    xmlhttp.open('GET', 'http://localhost:9000/surveyF/'+this.props.sid, true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();
  }

  deleteClick(e)
  {
    var x=confirm('are you sure you want to delete?');
    if(x==true)
    {
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
      xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        console.log('deleted');
        //  _this.setState({visible:true});
        _this.fetchdata();
      }
    };
    xmlhttp.open('DELETE', 'http://localhost:9000/feature/'+e, true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    //xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'no-cors');
    xmlhttp.send();

    //this.fetchdata();

  }
 }

  handleBackClick()
  {
    this.setState({visible:false, childVisible: true});
  }

  handleViewClick(a)
  {
    this.setState({fdata:a});
    console.log(this.state.fdata);
    this.setState({visible:false, childVisible: false});

  //  console.log(this.state.fdata.name);
  }

 componentDidMount()
  {
    console.log('executing mount');
    this.fetchdata();
  }

 render(){

   var d=this.state.d;

   return(
     <div>
     {this.state.visible
     ?<div>
       <Navigation uname={this.props.uname} />
      <div className="feature-heading"><center>FEATURES</center></div>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
      <div className="feature-left">
      <button className="btn btn-skin" onClick={this.handleBackClick}>Back</button>
	<div className="comments-container">
		<ul id="comments-list" className="comments-list">
    {d.map((dat) => {
             return (
			<li>
				<div className="comment-main-level">
					<div className="comment-avatar"><img src={dat.image} alt="" /></div>
					<div className="comment-box">
						<div className="comment-head">
							<h6 className="comment-name by-author">{dat.name}</h6>
              <span><img src={require('./img/icon_coupon.png')} width="20px" height="20px" alt="" />
              {dat.state}</span>
              <span><img src={require('./img/map-marker.png')} width="20px" height="20px" alt="" />
              {dat.type}</span>
                <img onClick={()=>this.deleteClick(dat.featureId)} src={require('./img/delete-xxl.png')} width="20px" height="20px" alt="" />
                <img onClick={()=>this.handleViewClick(dat)} src={require('./img/icon_view.png')} width="20px" height="25px" alt="" />
						</div>
						<div className="comment-content">
							{dat.descr}
						</div>
					</div>
				</div>
			</li>
    )
    })}
		</ul>
	</div>
      <br />
      </div>
      <div className="feature-right">
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
      <Map center={[17.39,78.4]} zoom={this.state.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {d.map((dat) => {
               return (
        <Marker position={[dat.latitude, dat.longitude]} draggable="true"  >
          <Popup>
            <span>{dat.name}</span>
          </Popup>
        </Marker>
      )
      })}
      </Map>
      </div>

      </div>
      :<div>{this.state.childVisible ? <Admin1 uname={this.props.uname} /> : <FeatureDetail f={this.state.fdata} sid={this.props.sid} uname={this.props.uname} /> }</div>
    }
     </div>
   );
 }
}

export default Features;
