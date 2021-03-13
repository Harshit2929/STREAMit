const express = require("express");
const app = express()
const PORT = process.env.PORT || 4000;
const cors = require("cors");
let http = require('http').Server(app)


app.use(cors());
app.use(express.static(__dirname + '/public'))

let io = require("socket.io")(http,{
    cors: {
      origin: "*"
    }
  })
let scount = 0;
io.on('connection',(socket)=>{
    
    console.log(socket.id)
    socket.on('disconnect', () => {
        socket.removeAllListeners();
     });
    socket.on('create or join',room=>{
        console.log("Room Started")

        // const myRoom = socket.clients(room).length || {length:0};
        // const numClients = myRoom.length;
        console.log(room,' has ', scount, ' clients');
        console.log("COUNTING = "+io.socket);
        if(scount == 0){
            socket.join(room)
            socket.emit('created',room);
            scount = 1;
        }else{
            console.log("REQUEST FOR JOIN")
            socket.join(room);
            socket.emit('joined',room);
            socket.broadcast.emit("CLIENT_REMOTE_DEVICE",{time:new Date()})

        }
        // else{
        //     socket.emit('full',room=>{

        //     })
        // }
    })

    socket.on('ready',room=>{
        console.log("SENDING READY TO ELECTRON SERVER");
        io.sockets.emit("ready",room);
        // socket.broadcast.to(room).emit('ready')
    })
    socket.on("OFFER_FROM_ELECTRON",event=>{
        console.log("GOT OFFER");
        socket.broadcast.emit("OFFER_FROM_ELECTRON",event)
    })
    socket.on('candidate',event=>{
        console.log('can',event)
        socket.broadcast.emit("candidate",event)
    })
    socket.on('offer',event=>{
        
        console.log('off',event)
        socket.broadcast.emit('offer',event)
    })
    socket.on('OPD',event=>{
        
        console.log('off',event)
        socket.broadcast.emit('offer',event)
    })
    socket.on('answer',event=>{
        console.log('ans',event)
        socket.broadcast.emit('answer',event)
    })


    console.log("New Cliend added")
})





http.listen(PORT,()=>{
    console.log(`Server Started at PORT = ${PORT}`);
})