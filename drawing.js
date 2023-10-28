let intialPosition = null;

// this arrays will hold the image objects after every mouse up.
const history = [];
let historyIndex = -1;

function onMouseDown(e) {
    if (!(actions.circle || actions.rectangle || actions.eraser || actions.freehand || actions.line || actions.arrow) ) {
        return;
    }
    console.log("inside");
    intialPosition = { x: e.clientX, y: e.clientY };
    startIndex = history.length - 1;
    c.strokeStyle = formState.strokestyle;
    c.lineWidth = formState.strokewidth;

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
    const currentPosition = { x: e.clientX, y: e.clientY };
    if (actions.freehand) {
        drawFreeHand(currentPosition);
    }
    else if (actions.eraser) {
        handleErase(currentPosition);
    }
    else if (actions.circle) {
        resetToOriginalImage();
        drawCircle(currentPosition);
    }
    else if (actions.rectangle) {
        resetToOriginalImage();
        drawRectangle(currentPosition);
    }
    else if (actions.line) {
        resetToOriginalImage();
        drawLine(currentPosition);
    }
    else if (actions.arrow) {
        console.log("arrowTrue")
        resetToOriginalImage();
        drawArrow(currentPosition);
    }
    
}

function onMouseUp() {
    // cleanup
    history.push(c.getImageData(0, 0, canvas.width, canvas.height));
    historyIndex++;
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
}

canvas.addEventListener("mousedown", onMouseDown);

function resetToOriginalImage() {
    if (startIndex !== -1) {
        // we have some drawings before we start the rectangle drawing.
        c.putImageData(history[startIndex], 0, 0);
    }
    else {
        // if i do not have drawings before we start rectangle drawing.
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function drawFreeHand(currentPosition) {
    c.beginPath();
    c.moveTo(intialPosition.x, intialPosition.y);
    c.lineTo(currentPosition.x, currentPosition.y);
    c.lineCap = "round";
    c.lineJoin = "round";
    c.stroke();
    c.closePath();
    intialPosition = currentPosition;
}

function handleErase(currentPosition) {
    c.clearRect(currentPosition.x, currentPosition.y, 30, 30);
}

function drawCircle(currentPosition) {
    c.beginPath();
    const radius = Math.sqrt(
        (currentPosition.x - intialPosition.x) ** 2 +
        (currentPosition.y - intialPosition.y) ** 2
    );

    c.arc(intialPosition.x, intialPosition.y, radius, 0, 2 * Math.PI, true);
    c.stroke();
}

function drawRectangle(currentPosition) {
    c.beginPath();
    // draw rectangle
    let width = currentPosition.x - intialPosition.x;
    let height = currentPosition.y - intialPosition.y;
    c.strokeRect(intialPosition.x, intialPosition.y, width, height);
}

function drawLine(currentPosition) {
    c.beginPath();
    c.moveTo(intialPosition.x, intialPosition.y);
    c.lineTo(currentPosition.x, currentPosition.y);
    c.stroke();
}

// function drawArrow(currentPosition){
//     console.log("drawArrow")
//     const arrow = {
//         dx: x2 - x1,
//         dy: y2 - y1
//     };
//   	const intialPosition = {
//         x: arrow.dx * t + x1,
//         y: arrow.dy * t + y1
//     };
//     const tip = {
//         dx: x2 - currentPosition.x,
//         dy: y2 - currentPosition.y
//     };

//     c.beginPath();
//     c.moveTo(x1, y1);
//      c.lineTo(currentPosition.x, currentPosition.y);
//   	c.moveTo(intialPosition.x + 0.5 * tip.dy, intialPosition.y - 0.5 * tip.dx);
//     c.lineTo(currentPosition.x - 0.5 * tip.dy, currentPosition.y + 0.5 * tip.dx);
//     c.lineTo(x2, y2);
//     c.closePath();
    
//      c.stroke();          
 
// }
// function drawRhombus(){
//     c.beginPath();
   
//     c.moveTointialPosition(x, y + halfWidth); // Top
//     c.lineTo(x - halfWidth, y); // Left
//     c.lineTo(x, y - halfWidth); // Bottom
//     c.lineTo(x + halfWidth, y); // Right
//     c.lineTo(x, y + halfWidth); // Back to Top
//     c.closePath();
// }
// clearCanvas.addEventListener("click", () =&gt; {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
//     setCanvasBackground();
// });
