import React,{Component} from 'react';
import socket from "./../socket";
import {xy} from './RemoteController.js'
import "./RemotePage.css";
const iceServer = {
    'iceServer':[
        {urls:'stun:stun.services.mozilla.com'},
        {urls:'stun:stun.l.google.com:19302'}
    ]
}
let remoteStream, rtcPeerConnection;
const StreamConstraints = {
    audio:true,
    video:true
}
const constraints = {
    audio:true,
    video:true
}
const ROOM = 500;
socket.on('created',room=>{
    console.log(room)
    console.log("CREATED")
    navigator.mediaDevices.getDisplayMedia(constraints).then(stream=>{
        // localStream = stream;
        // remoteVideo.srcObject = stream;
        // isCaller = true;
    }).catch(error=>{alert("Some Error Occured"+JSON.stringify(error))})


})


socket.on('joined',room=>{
    console.log(room)
    console.log("JOINED")
    
        socket.emit('ready',ROOM)



})

export default class RemotePage extends Component {
    constructor(props){
        super(props)
        this.state = {


        }
        this.video = null; 
        this.state = {
            video:null
        }
        this.eventRemoteStream = null;     
    }
    onAddStream = (event)=>{
        console.log("Remote Stream")
        console.log(event)
        console.log(event.streams[0])
        console.log(this.state.video)
        console.log("GOT STREAMS NOT UPDATING")
        this.state.video.srcObject = event.streams[0]
        remoteStream = event.streams[0]
    }
    onIceCandidate(event){
        if(event.candidate){
            console.log('sending ice candidate',event.candidate);
            socket.emit('candidate',{
                type:'candidate',
                label:event.candidate.sdpMLineIndex,
                id:event.candidate.sdpMid,
                candidate:event.candidate.candidate,
                room:ROOM
            })
        }
    }
    componentDidMount(){
        console.log(socket)
        console.log(this.video)

        socket.emit('create or join',ROOM);

        
        
        socket.on('OFFER_FROM_ELECTRON',(event)=>{
            console.log("OFFER");
                console.log("OFFER");
                
                    // remoteVideo.srcObject = stream;
                    // isCaller = true;
                    console.log(event)
                    
        
        
                    rtcPeerConnection = new RTCPeerConnection(iceServer)
        
                rtcPeerConnection.onicecandidate = this.onIceCandidate
                rtcPeerConnection.ontrack = this.onAddStream
                // rtcPeerConnection.setLocalDescription
                    console.log("Offer Recieved - ",event)
                rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.sessionDescription))
                rtcPeerConnection.createAnswer()
                    .then(sessionDescription =>{
        
                        rtcPeerConnection.setLocalDescription(sessionDescription)
                        socket.emit('answer',{type:'answer',sdp:sessionDescription,room:ROOM})
                    })
                    .catch(err=>{
                        console.log("Some Error creta eanser")
                    })
        
        
        
        
        
        })

        socket.on('answer',event=>{
            console.log("ANSWER");
            console.log("Answer - ",event)
            rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.sdp))
        })
        
        
        socket.on('candidate',event=>{
            console.log("CANDIDATE");
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: event.label,
                candidate:event.candidate
            })
            // s = event;
            console.log(
                event,candidate
            )
        
            rtcPeerConnection.addIceCandidate(candidate)
        
        })
        

    }
    handleContext = (context)=>{
        this.video = context;
        this.setState(init=>{
            return {video:context}
        })
    }
    render(){
        
        return <>
        <video onClick={xy} autoPlay className="streamPlayer" ref={this.handleContext}></video>
        </>
    }
}