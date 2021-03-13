var input_room_no = document.getElementById('roomNumber');
var room_btn = document.getElementById('start');


let room_no,localStream, remoteStream, rtcPeerConnection, isCaller;
let s = undefined;
let remoteVideo = document.getElementById('remoteVideo');

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



const socket = io()


console.log(socket)



room_btn.addEventListener('click',()=>{
    if(input_room_no.value){


        socket.emit('create or join',input_room_no.value);







    }else{
        alert("Please type room No.")
    }
})


socket.on('created',room=>{
    console.log(room)
    console.log("CREATED")
    navigator.mediaDevices.getDisplayMedia(constraints).then(stream=>{
        localStream = stream;
        // remoteVideo.srcObject = stream;
        isCaller = true;
    }).catch(error=>{alert("Some Error Occured"+JSON.stringify(error))})


})


socket.on('joined',room=>{
    console.log(room)
    console.log("JOINED")
    
        socket.emit('ready',input_room_no.value)



})

// socket.on('ready',()=>{
//     if(isCaller){
//         console.log("READY");
//         rtcPeerConnection = new RTCPeerConnection(iceServer)

//         rtcPeerConnection.onicecandidate = onIceCandidate
//         rtcPeerConnection.ontrack = onAddStream
//         rtcPeerConnection.addTrack(localStream.getTracks()[0],localStream)
//         rtcPeerConnection.addTrack(localStream.getTracks()[1],localStream)
//         // rtcPeerConnection.setLocalDescription
//         rtcPeerConnection.createOffer()
//             .then(sessionDescription =>{
//                 rtcPeerConnection.setLocalDescription(sessionDescription)
//                 console.log("STARTED",sessionDescription)
//                 socket.emit('OPD',{sessionDescription,room:input_room_no.value})
//             })
//             .catch(err=>{
//                 console.log("Some Error")
//             })
//     }
// })


function onAddStream(event){
    console.log("Remote Stream")
    console.log(event)
    console.log(event.streams[0])
    remoteVideo.srcObject = event.streams[0]
    remoteStream = event.streams[0]
}
function onIceCandidate(event){
    if(event.candidate){
        console.log('sending ice candidate',event.candidate);
        socket.emit('candidate',{
            type:'candidate',
            label:event.candidate.sdpMLineIndex,
            id:event.candidate.sdpMid,
            candidate:event.candidate.candidate,
            room:input_room_no.value
        })
    }
}


socket.on('OFFER_FROM_ELECTRON',(event)=>{
    console.log("OFFER");
    if(!isCaller){
        console.log("OFFER");
        
            // remoteVideo.srcObject = stream;
            // isCaller = true;
            console.log(event)
            


            rtcPeerConnection = new RTCPeerConnection(iceServer)

        rtcPeerConnection.onicecandidate = onIceCandidate
        rtcPeerConnection.ontrack = onAddStream
        // rtcPeerConnection.setLocalDescription
            console.log("Offer Recieved - ",event)
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event.sessionDescription))
        rtcPeerConnection.createAnswer()
            .then(sessionDescription =>{

                rtcPeerConnection.setLocalDescription(sessionDescription)
                socket.emit('answer',{type:'answer',sdp:sessionDescription,room:input_room_no.value})
            })
            .catch(err=>{
                console.log("Some Error creta eanser")
            })





        
    }
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
    s = event;
    console.log(
        event,candidate
    )

    rtcPeerConnection.addIceCandidate(candidate)

})

