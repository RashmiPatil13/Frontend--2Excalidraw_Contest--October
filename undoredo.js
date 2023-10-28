const undo = document.getElementById("undo")
const redo = document.getElementById("redo")

function onUndo(){
  if(historyIndex === 0) {
    c.clearRect(0, 0, canvas.width, canvas.height);
}
 if(historyIndex) {
  // history.pop();
    historyIndex -- ;
    c.putImageData(history[historyIndex], 0, 0);
  }
}


function onRedo(){
    // re do
    history.push();
    historyIndex ++;

    if (historyIndex <= history.length - 1) {
     
      c.putImageData(history[historyIndex +1], 0, 0);
    }
  }
      

undo.addEventListener("click",onUndo)
redo.addEventListener("click",onRedo)