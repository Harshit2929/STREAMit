//import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Navbar,Nav} from 'react-bootstrap'
import Home from './home.js';
import About from './about.js';
import Users from './users.js';
import { Route,BrowserRouter,Switch} from 'react-router-dom';
function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link to="/" >Home</Nav.Link>
      <Nav.Link to="/about">About</Nav.Link>
      <Nav.Link >Users</Nav.Link>
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
  </Switch>
  
  
  </BrowserRouter>
    </div>
  );
}
export default App;
