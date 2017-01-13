import React, { Component } from 'react';
import './css/style.css';

class SomeText extends Component {

render() {
    return (
      <div id="about" className="home-section color-dark bg-white">
  		<div className="container marginbot-50">
  			<div className="row">
  					<div className="section-heading text-center">
  					<h2 className="h-bold">{this.props.title}</h2>
  					<div className="divider-header"></div>
  					<p>{this.props.text}</p>
  					</div>
  				</div>
  			</div>
  	</div>
    );
  }
}

export default SomeText;
