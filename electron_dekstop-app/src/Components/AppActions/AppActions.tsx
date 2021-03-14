import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';

export default function AppActions(){

  let history = useHistory();
  return <div className="btn-group">
      <button className="btn btn-default" onClick={()=>{
        history.push("/recorder");
      }}>
        <span className="icon icon-home"></span>
      </button>
      <button className="btn btn-default">
        <span className="icon icon-folder"></span>
      </button>
      <button className="btn btn-default active">
        <span className="icon icon-cloud"></span>
      </button>
      <button className="btn btn-default">
        <span className="icon icon-popup"></span>
      </button>
      <button className="btn btn-default">
        <span className="icon icon-shuffle"></span>
      </button>
    </div>;
}
