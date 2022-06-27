/*let maze = document.body.createElement("canvas");
//document.getElementById("maze");
let ctx = maze.getContext("2d");
document.body.appendChild("maze");*/



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
        current = this.grid[0][0];
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

    window.requestAnimationFrame(()=>{
        this.draw();
    });
        
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






