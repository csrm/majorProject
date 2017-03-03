import React, { Component } from 'react';

import Loc from './loc'

class SForm extends Component {

  render() {
    return (
      <div className="Root">
      <div className="App">
      <div className="header">
      <div className="form1">
        <form id="f1">
        <panel className="Location">
         <Loc/>
        </panel>
        <panel className="fields">
        FEATURE FORM

           <input type="text" id="sname" placeholder="Name"/>
           <textarea id="desc"  placeholder="Feature Description"/>
           <input type="text" id="stype" placeholder="Feature Type"/>
           <select id="state" defaultValue="----Choose An Option---">
            <option>Polygon</option>
            <option>Line</option>
            <option>Point</option>&nbsp&nbsp;&nbsp;
            <option>----Choose An Option---</option>&nbsp;
          </select>
          <input type="text" id="size"  placeholder="Feature size"/>
          <input type="text" id="height" placeholder="Feature Height"/>
          <input type="text" id="area"  placeholder="Area of the Feature"/>

          <input type="submit" />
          </panel>
        </form>
        </div>
        </div>
        </div>
        </div>

    );
  }
}

export default SForm;
