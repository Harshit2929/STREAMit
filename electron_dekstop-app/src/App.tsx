import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import AppActions from './Components/AppActions/AppActions';
import BrandNavbar from './Components/BrandNavbar/BrandNavbar';
import LeftNavbar from './Components/LeftNavbar/LeftNavbar';
import RightActions from './Components/RightActions/RightActions';
import Recorder from './Pages/Recorder/Recorder';

const AppValues = {
  appName:"the Remote Server"
};



function aq(){
  return <div>
    <BrandNavbar appName={AppValues.appName}>
          <div className="toolbar-actions">
            <AppActions />
            <RightActions />
          </div>
        </BrandNavbar>
        <div className="myWindowContent" style={{display:"flex",width:"100vw"}}>
          <div className="myLeftWindow" style={{width:"30%",height:"100vh",borderRight:'1px solid black'}}>
          <LeftNavbar />

          </div>
          <div className="myRightWindow" style={{width:'100%',height:"100vh"}}>
            <Route path="/recorder" component={Recorder} />
          </div>
        </div>


        </div>;
}

export default function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" component={aq} />

      </Switch>
    </Router>
  );
}
