const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;
const c = canvas.getContext("2d");


canvas.addEventListener("mousedown", onMouseDown); 
canvas.addEventListener("mouseup", onMouseUp);
let drawingColor = "red";
let previousPosition = null ;

function onMouseDown(e) {
    previousPosition = [ e.clientX , e.clientY];
    
    c.lineWidth = 2; 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp); 
}

function onMouseMove(e){ 
     
    let currentPosition = [ e.clientX , e.clientY ];
   
    c.beginPath();
    c.moveTo(...previousPosition);
    c.lineTo(...currentPosition);
    c.stroke();
    c.closePath();
    previousPosition = currentPosition ;
}

function onMouseUp(e){ 
    canvas.removeEventListener("mousemove", onMouseMove);
}




