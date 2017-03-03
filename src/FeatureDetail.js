import React, { Component } from 'react';
import './FeatureDetail.css';
import Admin from './Admin';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon, marker} from 'leaflet';
import Features from './Features';
import Navigation from './Navigation';

class FeatureDetail extends Component {

  constructor(props){

      super(props);
      this.state={mapVisible: false, childVisible: true};

      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });

      this.mapClick=this.mapClick.bind(this);
      this.backClick=this.backClick.bind(this);
  }

  mapClick()
  {
    this.setState({mapVisible: true});
  }

  backClick()
  {
    this.setState({childVisible: false});
  }

  render(){

    return(
      <div>
      {this.state.childVisible
      ?<div>
        <Navigation uname={this.props.uname} />
      <div className="featured">
        <div className="featured-left">
         <button className="btn btn-skin" onClick={this.backClick}>Back</button>
          <p className="feature-title">{this.props.f.name} </p>
          <p className="feature-descr">
            {this.props.f.descr}  <br /><br />
            Type: {this.props.f.type} <br />
            Size: {this.props.f.size} <br />
            Height: {this.props.f.height} <br />
            Area: {this.props.f.area} <br />
            State: {this.props.f.state} <br />
          </p>
          <br />
        <center>  <img src={this.props.f.image} alt="" /> </center>
        </div>
          <div className="featured-right">
          <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
      <Map center={[17.4,78.4]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
        <Marker position={[this.props.f.latitude, this.props.f.longitude]} draggable="true"  >
          <Popup>
            <span>{this.props.f.name}</span>
          </Popup>
        </Marker>
      </Map>
      </div>
    </div>
    <button className="btn btn-skin" onClick={this.backClick}>Back</button>
    </div>
    :<Features sid={this.props.sid} uname={this.props.uname} />
    }
    </div>
    )
  }
}

export default FeatureDetail;
