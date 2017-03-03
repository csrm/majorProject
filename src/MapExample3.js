import React, { Component, PropTypes } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L,{Icon } from 'leaflet';
import './MapExample.css';


export default class MapExample3 extends Component {


 render () {

   <div>
   	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

   	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
   	<script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>

   <div id="mapid" style="width: 600px; height: 400px;"></div>


   <script>

   	var mymap = L.map('mapid').setView([51.505, -0.09], 13);


       L.tileLayer('http://{s}.tile.cloudmade.com/API-KEY/997/256/{z}/{x}/{y}.png', {
         maxZoom: 18,
       }).addTo(mapid);

   	L.marker([51.5, -0.09]).addTo(mymap)
   		.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

   	L.circle([51.508, -0.11], 500, {
   		color: 'red',
   		fillColor: '#f03',
   		fillOpacity: 0.5
   	}).addTo(mymap).bindPopup("I am a circle.");

   	L.polygon([
   		[51.509, -0.08],
   		[51.503, -0.06],
   		[51.51, -0.047]
   	]).addTo(mymap).bindPopup("I am a polygon.");


   	var popup = L.popup();

   	function onMapClick(e) {
   		popup
   			.setLatLng(e.latlng)
   			.setContent("You clicked the map at " + e.latlng.toString())
   			.openOn(mymap);
   	}

   	mymap.on('click', onMapClick);

   </script>
  </div>
 }
}
