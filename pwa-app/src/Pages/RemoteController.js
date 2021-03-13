export default function xy(event){
    var x=event.clientX;
    var y=event.clientY;
    var w=window.innerWidth;
  var  h=window.innerHeight;
  if(x>(w/2)){
      console.log('L');
  }
  if(x<(w/2)){
    console.log('R');
}

}

// export function RemoteController(){
// var w=window.innerWidth;
// var  h=window.innerHeight;

// //if()


// }