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
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hours * 3600)) / 60);
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


