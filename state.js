const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
clearcanvas = document.querySelector(".clear-canvas");
saveimage = document.querySelector(".save-img");
const c = canvas.getContext("2d");

const actionButtons = document.querySelectorAll(" #actionbuttons > button");

const form = document.querySelector(".form");

const formState = {
    strokewidth: 3,
    strokestyle: "black"
}

const actions = {
    freehand: false,
    rectangle: false,
    eraser: false,
    circle: false,
    line: false,
    arrow:false,
}

function toggleMenu() {
    form.classList.toggle("hide");
}

function onInput(element) {
    const newValue = element.value;
    if (element.name === "strokewidth")
        formState[element.name] = parseInt(newValue);
    else
        formState[element.name] = newValue;

    console.log(formState);
}


function onActionClick(element) {
    const actionName = element.id;
    actionButtons.forEach(button => {
        // for the remaining three options if active class present remove that clas.
        if (button.classList.contains("active") && button.id !== actionName) {
            button.classList.remove("active");
        }
    })
    element.classList.toggle("active");

    actionButtons.forEach(button => {
        const isActive = button.classList.contains("active")
        // {freehand: "active", rectangle: '', circle: '', eraser: ''}
        actions[button.id] = isActive;
    })
    console.log(actions);
}

clearcanvas.addEventListener ("click", () =>{
    c.clearRect(0,0, canvas.width, canvas.height);
});
saveimage.addEventListener("click", () =>{
    const link = document.createElement("a"); 
    link.download = `${Date.now()}.jpg`; 
    link.href = canvas.toDataURL(); 
    link.click(); 
});


