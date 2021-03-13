//import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Navbar,Nav} from 'react-bootstrap'
import Home from './home.js';
import About from './about.js';
import Users from './users.js';
import { Link, Route,BrowserRouter,Switch} from 'react-router-dom';
import RemotePage from './Pages/RemotePage';
import Recorder from './Pages/Recorder';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="" >Home</Link>
          <Link to="about">About</Link>
          <Link to="/users">Users</Link>
          <Link to="/remote">Remote</Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form> */}
      </Navbar>

  <Switch>
    <Route exact path='/' component={Home} ></Route>
    <Route exact path='/about' component={About} ></Route>
    <Route exact path='/users' component={Users} ></Route>
    <Route exact path="/remote" component={RemotePage}></Route>
    <Route exact path="/recorder" component={Recorder} />
  </Switch>
  
  
  </BrowserRouter>
    </div>
  );
}
export default App;
