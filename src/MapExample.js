import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon, marker} from 'leaflet';
import './MapExample.css';

export default class MapExample extends Component {
  constructor()
  {
    super();
    this.state = { lat: '', lng: '', zoom: 13, x:''};

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    this.showPosition=this.showPosition.bind(this);
    this.getPosition=this.getPosition.bind(this);
    this.mdrag=this.mdrag.bind(this);
    this.getPosition();
  }

  mdrag(e)
  {
    this.setState({x: e.target.getLatLng()});
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  showPosition(position) {
  this.setState({lat:position.coords.latitude, lng:position.coords.longitude});
 }

 render () {
  // const position = [this.state.lat, this.state.lng];
    return (
      <div>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
        <Marker position={[this.state.lat, this.state.lng]} draggable="true"  dragend={this.mdrag} >
          <Popup>
            <span>latitude:{this.state.lat}<br />longitude: {this.state.lng }</span>
          </Popup>
        </Marker>
      </Map>
      <p>{this.state.x}</p>
      </div>
    )
  }
}
