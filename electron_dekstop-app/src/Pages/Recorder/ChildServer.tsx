import React, { Component, useState } from 'react';
let http = require("http");

let process = require("process")


export default class ChildServer extends Component{
  constructor(props){
    super(props)
    this.count = 0;
    this.state = {
      server:undefined,
      app:undefined
    }
  }

startServer = ()=>{
  console.log("CALLEDSERVER")
  let app = undefined;
  if(this.count==0){
    app = http.createServer((request, response)=>{
      this.count = this.count + 1;
      console.log("CONNECTION "+this.count);
      // Sends a chunk of the response body
      response.write('Hello World!');

      // Signals the server that all of
      // the response headers and body
      // have been sent
    response.end();
  });

  console.log(app)
  app.listen(3000,()=>{
    console.log("SERVER STARTED")
    this.setState(init=>{
      return {...init,server:app}
    })
    console.log(app);

  }); // Server listening on port 3000
  app.on('connection', function(socket) {
    console.log("A new connection was made by a client.");
    socket.setTimeout(10 * 1000);
    // 30 second timeout. Change this as you see fit.
  });
  // app.close();
  }

}
stopServer = ()=>{
  console.log(this.state.server)
  if(this.state.server != undefined){
    this.state.server.close();
    this.count = 0;
    console.log("SERVER STOPPED")
  }
}



  render(){
    return <>
    Child Server [ Server TimeOut for New Connection = 10seconds ( By Default ) ]<br />
    <button onClick={this.startServer}>Start Local Server</button>
    <button onClick={this.stopServer}>Stop Local Server</button>
</>
  }
}
