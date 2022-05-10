const timer_el = document.getElementById("timer");
const start_btn = document.getElementById("playWhite");

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


const canvas = document.getElementById("gamePad");
const ctx = canvas.getContext("2d");
const parentDiv = getElementById("gameDisplay");

canvas.clientHeight = parentDiv.clientHeight;


