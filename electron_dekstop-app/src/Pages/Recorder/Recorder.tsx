import React, { useEffect, useState } from 'react';
import ChildServer from './ChildServer';
import ParentServer from './ParentServer';
const { desktopCapturer } = require('electron')
import socket from './../../socket/socket';

let room_no,localStream, remoteStream, rtcPeerConnection, isCaller;
let ROOM_NO = 500;
const iceServer = {
  'iceServer':[
      {urls:'stun:stun.services.mozilla.com'},
      {urls:'stun:stun.l.google.com:19302'}
  ]
}

const StreamConstraints = {
  audio:true,
  video:true
}
const constraints = {
  audio:true,
  video:true
}

export default (props)=>{


  let [ctx,setCtx] = useState(undefined);

  function handleStream (stream) {
    // const video = document.querySelector('video')
    const video = ctx;
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()


    // Socket Streams
    socket.emit("create or join",ROOM_NO);
    socket.on("created",(roomno)=>{
      console.log(`CREATED ROOM AT SERVER with PORT ${roomno}`);
    })
    socket.on("CLIENT_REMOTE_DEVICE",data=>{
      console.log(data)
    })
    console.log(stream.getTracks())


    socket.on('ready',event=>{
      console.log("RECIEVED FROM ELECTRON SERVER");
      rtcPeerConnection = new RTCPeerConnection(iceServer)

        rtcPeerConnection.onicecandidate = onIceCandidate
        rtcPeerConnection.ontrack = onAddStream
        rtcPeerConnection.addTrack(stream.getTracks()[0],stream)
        // rtcPeerConnection.setLocalDescription
        rtcPeerConnection.createOffer()
            .then(sessionDescription =>{
                rtcPeerConnection.setLocalDescription(sessionDescription)
                console.log("STARTED",sessionDescription)
                socket.emit('OFFER_FROM_ELECTRON',{sessionDescription,room:ROOM_NO})
            })
            .catch(err=>{
                console.log("Some Error")
                console.log(err)
            })

  })
//   socket.on('offer',(event)=>{
//         navigator.mediaDevices.getUserMedia(constraints).then(stream=>{
//             localVideo.srcObject = stream;
//             localStream = stream;
//             // remoteVideo.srcObject = stream;
//             // isCaller = true;
//             console.log(event)



//             rtcPeerConnection = new RTCPeerConnection(iceServer)

//         rtcPeerConnection.onicecandidate = onIceCandidate
//         rtcPeerConnection.ontrack = onAddStream
//         rtcPeerConnection.addTrack(localStream.getTracks()[0],localStream)
//         rtcPeerConnection.addTrack(localStream.getTracks()[1],localStream)
//         // rtcPeerConnection.setLocalDescription
//             console.log("Offer Recieved - ",event)
//         rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.sessionDescription))
//         rtcPeerConnection.createAnswer()
//             .then(sessionDescription =>{

//                 rtcPeerConnection.setLocalDescription(sessionDescription)
//                 socket.emit('answer',{type:'answer',sdp:sessionDescription,room:input_room_no.value})
//             })
//             .catch(err=>{
//                 console.log("Some Error creta eanser")
//             })



//         }).catch(error=>{console.log(error); alert("Some Error Occured offer")})


// })


  // Optional
  socket.on('answer',event=>{
    console.log("Answer - ",event)
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.sdp))
})

socket.on('candidate',event=>{
  const candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate:event.candidate
  })

  // console.log(
  //     event,candidate
  // )

  rtcPeerConnection.addIceCandidate(candidate)

})





  }

  function handleError (e) {
    console.log(e)
  }


  function ask(){
    console.log("asked")
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      console.log(sources)
      for (const source of sources) {
        if (source.name === "Entire Screen") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720
                }
              }
            })
            console.log("ASKED")
            handleStream(stream)
          } catch (e) {
            handleError(e)
          }
          // return
        }
      }
    })

  }

  function onAddStream(event){
    console.log("Remote Stream")
    console.log(event)
    console.log(event.streams[0])
    // remoteVideo.srcObject = event.streams[0]
    // remoteStream = event.streams[0]
}
function onIceCandidate(event){
    if(event.candidate){
        console.log('sending ice candidate',event.candidate);
        socket.emit('candidate',{
            type:'candidate',
            label:event.candidate.sdpMLineIndex,
            id:event.candidate.sdpMid,
            candidate:event.candidate.candidate,
            room:ROOM_NO
        })
    }
}


  useEffect(()=>{
    console.log(socket)



  },[])


  return <div className="RecorderContainer">
    <div style={{margin:'0 auto'}}>
      <ParentServer />
    </div>
    <hr />
    <br />
    <ChildServer />
    <hr />
    <br />
    <a>Screen Sharing Options</a>
    <div>
      <button className="btn btn-default"  onClick={ask}><span className="icon icon-play"></span> Share Screen</button>
      <button className="btn btn-default"><span className="icon icon-pause"></span> Pause Sharing</button>
      <button className="btn btn-default"><span className="icon icon-stop"></span> End Sharing</button>
    </div>
    <video src="" ref={sctx=>{
        setCtx(sctx);
      }}></video>


  </div>

}
