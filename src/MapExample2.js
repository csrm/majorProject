import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon } from 'leaflet';
import './MapExample.css';

export default class MapExample2 extends Component {


 render () {

   var map = L.map(this.element.dom).setView([51.505, -0.09], 13);

   L.tileLayer('http://{s}.tile.cloudmade.com/API-KEY/997/256/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ©     <a href="http://cloudmade.com">CloudMade</a>',
     maxZoom: 18
   }).addTo(map);

   function onMapClick(e) {
     var marker = new L.marker(e.latlng, {draggable:'true'});
     marker.on('dragend', function(event){
       var marker = event.target;
       var position = marker.getLatLng();
       marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
       map.panTo(new L.LatLng(position.lat, position.lng))
     });
     map.addLayer(marker);
   };

   map.on('click', onMapClick);

    return (
      <div>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.ie.css" />
      <script src="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js"></script>
      <div className="map" style="width: 600px; height: 600px;"></div>
      </div>
    )
  }
}
