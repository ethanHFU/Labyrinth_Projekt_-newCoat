const timer_el = document.getElementById("timer");
const start_btn = document.getElementById("playWhite");
const gamePad = document.getElementById("gameDisplay");

 


let seconds = 0;
let interval = null;

// Event listeners 
//start_btn.addEventListener("click", start);


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

//game starts
start_btn.addEventListener("click", ()=>{start_btn.style.display = "none";});
start_btn.addEventListener("click", ()=>{createGamePad()});
const placements = [];
start_btn.addEventListener("click", startGame);






const canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");


canvas.height = screen.height * (0.85*0.7);
canvas.width = screen.width * (0.7);
canvas.style.borderRadius = "1.5rem";
canvas.style.border = "2px solid black";




function createGamePad(){
    //ctx.fillRect(25,25,25,25)
    gamePad.appendChild(canvas);
}

let posX = 35;
let posY = canvas.height/2;



let dx = 0;
let dy = 0;

let speed = 2;

document.addEventListener("keydown", direction);


function direction(e) {
    if(e.code === 'KeyD') {
        if(posX < canvas.width - 10){
            dx = speed;
            dy = 0;
        }
    }
    else if(e.code === 'KeyA') {
        if(posX != 0 + 10){
            dx = -speed;
            dy = 0;
        }
    }
    else if(e.code === 'KeyW') {
        if(posY != 0 + 10){
            dx = 0;
            dy = -speed;
        }
    }

    else if(e.code === 'KeyS') {
        if(posY != canvas.height - 10){
            dx = 0;
            dy = speed;
        }
    }

}




function drawWall(x, y, width, height){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}





function drawBall(){
    ctx.beginPath();
    ctx.arc(posX, posY, 25, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    for(let i = 0; i < placements.length; i++){
        
        drawWall(placements[i].x, 0, 20, placements[i].pos);
        drawWall(placements[i].x, placements[i].pos + placements[i].opening, 20, canvas.height - placements[i].pos - placements[i].opening);

    }

    


    if((posX + dx) >= 10 && (posX + dx) <= canvas.width - 10){
        posX += dx;
    }
    
    if ((posY + dy) >= 10 && (posY + dy) < canvas.height - 10){
        posY += dy;
    }

    
}

// call draw every x ms 
function startGame(){
    gameInterval = setInterval(draw, 1);
    generateWallInfo(5, 50, 100);
}

ctx.getImageData

function generateWallInfo(segments, minOpening, maxOpening){

    

    for(let i = 0; i < segments; i++){
        
        let delta = canvas.width/segments;

        let openingSize = getRndInteger(minOpening, maxOpening);
        

        let openingY = getRndInteger(0, canvas.height - openingSize);



        const wall = {x:(i + 1)*delta, opening:openingSize, pos:openingY};

        placements[i] = wall;

    }

}

function getRndInteger(min, max) {
    let x = Math.floor(Math.random() * (max - min) ) + min;
    

    return x;
  }



