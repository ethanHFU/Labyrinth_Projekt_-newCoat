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
start_btn.addEventListener("click", startGame);






let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.borderRadius = "1.5rem";
canvas.style.border = "2px solid black";



function createGamePad(){
    //ctx.fillRect(25,25,25,25)
    gamePad.appendChild(canvas);
}

let posX = 25;
let posY = canvas.height - 12.5 ;



let dx = 0.5;
let dy = 0;



document.addEventListener("keydown", direction);


function direction(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        dx = 0.5;
        dy = 0;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        dx = -0.5;
        dy = 0;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        dx = 0;
        dy = -0.5;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        dx = 0;
        dy = 0.5;
    }

}



function drawBall(){
    ctx.beginPath();
    ctx.arc(posX, posY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    posX += dx;
    posY += dy;

    if(posX == canvas.width - 10 || posX == 0 + 10){
        dx = -dx;
    }
    if(posY == canvas.height - 10 || posY == 0 + 10){
        dy = -dy;
    }


}

function startGame(){
    gameInterval = setInterval(draw, 10);
}



