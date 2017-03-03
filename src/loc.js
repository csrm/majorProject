import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon, marker} from 'leaflet';
//import './Map2.css';
import './MapExample.css';

class Loc extends Component {
/*  constructor() {
    // In a constructor, call `super` first if the class extends another class
    super();
    this.state={ text: 'Get My Location', img: '', errmsg: '',lat:''};
    this.getLoc=this.getLocation.bind(this);
    }
  getLocation()
  {
    this.showPosition=this.showPosition.bind(this);
    this.showError=this.showError.bind(this);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
  }
}
  showPosition(position) {
    let latlon = position.coords.latitude + "," + position.coords.longitude;
    let img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
     this.setState({img:img_url});
     this.setState({errmsg:''});
     this.setState({lat:latlon})
}
showError(error) {
  this.setState({img:''});
      switch(error.code) {
        case error.PERMISSION_DENIED:
            let msg = "User denied the request for Geolocation."
            this.setState({errmsg:msg});
            break;
        case error.POSITION_UNAVAILABLE:
        msg = "Location information is unavailable."
          this.setState({errmsg:msg});
            break;
        case error.TIMEOUT:
          msg = "The request to get user location timed out."
          this.setState({errmsg:msg});
            break;
        case error.UNKNOWN_ERROR:
        msg = "An unknown error occurred."
          this.setState({errmsg:msg});
            break;
    }
    this.setState({lat:''});
}
*/
constructor()
{
  super();
  this.state = { lat: 17, lng: 78, zoom: 13, visible: false};

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  this.showPosition=this.showPosition.bind(this);
  this.getPosition=this.getPosition.bind(this);
  this.getloc=this.getloc.bind(this);
  //this.getPosition();
}

getloc()
{
  this.getPosition();
  this.setState({visible:true});
}

getPosition() {
  navigator.geolocation.getCurrentPosition(this.showPosition);
  //  this.setState({mapVisible:true});
}

showPosition(position) {
this.setState({lat:position.coords.latitude, lng:position.coords.longitude});
console.log(this.state.lat);
this.props.onPropsHandle(this.state.lat,this.state.lng);
}

  render() {
    return (
      <div>
        <button className="btn btn-skin" onClick={this.getloc}>Get Location</button>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        {this.state.visible
        ?
        <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={[this.state.lat, this.state.lng]} draggable="true" >
            <Popup>
              <span>latitude: {this.state.lat}<br />longitude:{this.state.lng}</span>
            </Popup>
          </Marker>
        </Map>
      :<div></div>
    }
      </div>
    );
  }
}

export default Loc;
