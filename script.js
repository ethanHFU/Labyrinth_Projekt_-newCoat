const timer_el = document.getElementById("timer");
const start_btn = document.getElementById("playWhite");
const gamePad = document.getElementById("gameDisplay");


let seconds = 0;
let interval = null;

// Event listeners 
start_btn.addEventListener("click", start);

// Update timer

function timer  () {
    seconds++;

    // Format our time
    let mins = Math.floor(seconds/60);
    let secs = seconds % 60;

    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;
    
    timer_el.innerText = `${mins}:${secs}`;
}

function start(){
    if (interval){
        return;
    }

    interval = setInterval(timer, 1000)
}


start_btn.addEventListener("click", ()=>{start_btn.style.display = "none";});
start_btn.addEventListener("click", ()=>{createGamePad()});




function createGamePad(){
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");


    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.borderRadius = "1.5rem";
    canvas.style.border = "2px solid black";
    ctx.fillRect(25,25,25,25);
    

    gamePad.appendChild(canvas);
}






