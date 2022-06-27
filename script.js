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


let level = 0;








let maze = document.getElementById("maze");
let ctx = maze.getContext("2d");

let num = 0;



let current;

class Maze {
    constructor(size, rows, columns, width, height){
        this.size = size; 
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = []; 
    }

    setup(){
        for(let r = 0; r < this.rows; r++){
            let row = [];
            for(let c = 0; c < this.columns; c++){
                let cell = new Cell(r, c, this.grid, this.size, this.width, this.height);
                row.push(cell);
            }
            this.grid.push(row);
        }

        let row = getRandomIntInclusive(0, this.rows - 1);
        let col = getRandomIntInclusive(0, this.columns - 1);

        current = this.grid[row][col];
    }


    



    draw(){
        maze.width = this.width;
        maze.height = this.height;
        //maze.style.background = "black";
        current.visited = true;

        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                let grid = this.grid;
                grid[r][c].show(this.size, this.rows, this.columns, this.width, this.height);
            }
        }

        let next = current.checkNeighbours();

        if(next){
            next.visited = true;
            
            this.stack.push(current);

            current.highlight(this.columns, this.rows);

            current.removeWall(current, next);

            current = next;
        }else if(this.stack.length > 0){

            let cell = this.stack.pop();
            current = cell;
            current.highlight(this.columns, this.rows);
        }

    if (this.stack.length == 0){
        return;
    }

    this.draw();
    /*while (num < 1){
        this.draw();
        num++;
    }*/




    /*window.requestAnimationFrame(()=>{
        this.draw();
    });*/
        
    }
}
class Cell { 
    constructor(rowNum, colNum, parentGrid, parentSize, parentWidth, parentHeight){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;
        this.visited = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true,
        };
    }

checkNeighbours(){
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    let top = row !== 0 ? grid[row-1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if(neighbours.length !== 0){
        let random = Math.floor(Math.random() * neighbours.length);
        return neighbours[random];
    }else{
        return undefined;
    }



}

    drawTopWall(x, y, size, columns, rows, width, height){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width/columns, y);
        ctx.stroke();
    }

    drawRightWall(x, y, size, columns, rows, width, height){
        ctx.beginPath();
        ctx.moveTo(x + width/columns, y);
        ctx.lineTo(x + width/columns, y + height/ rows);
        ctx.stroke();
    }

    drawBottomWall(x, y, size, columns, rows, width, height){
        ctx.beginPath();
        ctx.moveTo(x, y + height / rows);
        ctx.lineTo(x + width / columns, y + height / rows);
        ctx.stroke();
    }

    drawLeftWall(x, y, size, columns, rows, width, height){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height / rows);
        ctx.stroke();
    }



    highlight(columns, rows){
        let x = (this.colNum * this.parentWidth) / columns + 1;
        let y = (this.rowNum * this.parentHeight) / rows + 1;

        ctx.fillStyle = "purple";
        ctx.fillRect(x, y, this.parentWidth/columns - 3, this.parentHeight/rows - 3);
    }



    removeWall(cell1, cell2){
        let x = cell1.colNum - cell2.colNum;
       
        if(x == 1){
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        }else if (x == -1){
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;

        if(y == 1){
            cell1.walls.topWall = false,
            cell2.walls.bottomWall = false;
        }else if(y == -1){
            cell1.walls.bottomWall = false,
            cell2.walls.topWall = false;
        }

    }

    show(size, rows, columns, width, height){
        let x = (this.colNum * width) / columns;
        let y = (this.rowNum * height) / rows;
        
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;

        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows, width, height);
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows, width, height);
        if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows, width, height);
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows, width, height);
        if (this.visited){
            ctx.fillRect(x + 1, y + 1, width / columns - 2, height / rows - 2);
        }
    }

}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }




  function getCellIndexByXY(x, y, width, height, columns, rows){

    let xNew = x % (width/columns);
    let yNew = y % (height/rows);
    let colIndex = ((x - xNew) / (width/columns));
    let rowIndex = ((y - yNew) / (height/rows));

    let indeces = {colIndex, rowIndex};
    return indeces;


  }






let mWidth = 500;
let mHeight = 500;
let mSize = mWidth*mHeight;
let mRows = 0.014 * mHeight;
let mColumns = 0.014 * mWidth;


let newMaze = new Maze(mSize, mRows, mColumns, mWidth, mHeight);
newMaze.setup();
newMaze.draw();


let goalPosX = getRandomIntInclusive(0, mColumns - 1) * (mWidth/mColumns);
let goalPosY = getRandomIntInclusive(0, mRows - 1) * (mHeight/mRows);

let playerPosX = mWidth/2;
let playerPosY = mHeight/2;

function drawGoal(x, y, width, height, columns, rows){
   
    ctx.fillStyle = "rgba(0, 255, 0, .3)";
    ctx.fillRect(x+2, y+2, mWidth/columns-2, mHeight/rows-2);
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(playerPosX, playerPosY, 16, 0, Math.PI*2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}


let dx = 0;
let dy = 0;

document.addEventListener("keydown", direction);
document.addEventListener("keydown", (e)=>{if (e.code === "Space") {dx = 0; dy = 0;}});

function direction(e) {
    if(e.code === 'KeyD') {
       
            dx = 1;
            dy = 0;
        
    }
    else if(e.code === 'KeyA') {
        
            dx = -1;
            dy = 0;
        
    }
    else if(e.code === 'KeyW') {
        
            dx = 0;
            dy = -1;
        
    }

    else if(e.code === 'KeyS') {
       
            dx = 0;
            dy = 1;
        
    }

}



let memorizedCell = getCellIndexByXY(playerPosX, playerPosY, mWidth, mHeight, mColumns, mRows);


function drawGame() {
    ctx.clearRect(0, 0, maze.width, maze.height);
    
    ctx.fillRect(0, 0, maze.width, maze.height);
    
    newMaze.draw(goalPosX, goalPosY, mSize, mColumns, mRows);
    //console.log(newMaze.grid[0][0].walls.bottomWall);
    drawGoal(goalPosX, goalPosY, mWidth, mHeight, mColumns, mRows);
    drawBall();
    
    playerPosX += dx;
    playerPosY += dy;

    let currentCell = getCellIndexByXY(playerPosX, playerPosY, mWidth, mHeight, mColumns, mRows);
    
    //console.log(currentCell.xNew + "   " + currentCell.yNew);

    if(currentCell.colIndex !== memorizedCell.colIndex || currentCell.rowIndex !== memorizedCell.rowIndex ){
        console.log(currentCell.colIndex + "  " + currentCell.rowIndex);
        memorizedCell.colIndex = currentCell.colIndex;
        memorizedCell.rowIndex = currentCell.rowIndex;

    };

    if(newMaze.grid[currentCell.rowIndex][currentCell.colIndex].walls.rightWall){
        
        if(playerPosX + 16 >= (currentCell.colIndex * (mWidth/mColumns)) + (mWidth/mColumns)){
            dx = 0;
        }
    };

    if(newMaze.grid[currentCell.rowIndex][currentCell.colIndex].walls.leftWall){
        
        if(playerPosX - 16 <= (currentCell.colIndex * (mWidth/mColumns))){
            dx = 0;
        }
    };

    if(newMaze.grid[currentCell.rowIndex][currentCell.colIndex].walls.topWall){
        
        if(playerPosY - 16 <= (currentCell.rowIndex * (mHeight/mRows))){
            dy = 0;
        }
    };

    if(newMaze.grid[currentCell.rowIndex][currentCell.colIndex].walls.bottomWall){
        
        if(playerPosY + 16 >= (currentCell.rowIndex * (mHeight/mRows)) + (mHeight/mRows)){
            dy = 0;
        }
    };


    //goal reached
    if(playerPosX - 16 >= goalPosX && playerPosX + 16 <= goalPosX + (mWidth/mColumns)){
        if(playerPosY - 16>= goalPosY && playerPosY + 16 <= goalPosY + (mHeight/mRows)){
            dx = 0;
            dy = 0;
        }
    }


  

   



}
    //drawGame();
    gameInterval = setInterval(drawGame, 16);

