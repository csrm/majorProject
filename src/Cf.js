import React, { Component } from 'react';
import Coverflow from 'react-coverflow';

class Cf extends Component{

render() {

  return(
    <div>
    <Coverflow
    width={1350}
    height={300}
    displayQuantityOfSide={2}
    navigation={false}
    enableHeading={false}
    >
    <img src={require('./img/hotel1.jpeg')} alt='title or description'  />
    <img src={require('./img/mall2.jpeg')} alt='title or description'/>
    <img src={require('./img/mall1.jpeg')} alt='title or description' />
    <img src={require('./img/temple2.jpeg')} alt='title or description'/>
    <img src={require('./img/place1.jpeg')} alt='title or description'/>
    <img src={require('./img/resort1.jpeg')} alt='title or description'/>
  </Coverflow>
  </div>
  );
 }
}

export default Cf;
