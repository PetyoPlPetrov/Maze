const targetColor = "rgb(83, 247, 43)";

class Cell {
  constructor(rowNum, colNum, parentGrid, parentSize, name, ctx) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    this.goal = false;
    this.name = name;
    this.ctx = ctx;
  }

  checkNeighbors() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbors = [];
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      let random = Math.floor(Math.random() * neighbors.length);
      return neighbors[random];
    } else {
      return undefined;
    }
  }

  drawTopWall(x, y, size, columns, rows, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 15;

    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }
  drawRightWall(x, y, size, columns, rows, ctx) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineWidth = 15;

    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  drawBottomWall(x, y, size, columns, rows, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineWidth = 15;

    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  drawLeftWall(x, y, size, columns, rows, ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 15;

    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }
  removeWall(cell1, cell2) {
    let x = cell1.colNum - cell2.colNum;
    if (x === 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x === -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum;
    if (y === 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y === -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  heighlight(columns, ctx) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;

    ctx.fillStyle = targetColor;
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }
  unmark(columns, ctx) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;

    ctx.fillStyle = "black";
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  show(size, rows, columns, ctx) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;
    if (this.walls.topWall) {
      this.drawTopWall(x, y, size, columns, rows, ctx);
    }
    if (this.walls.rightWall) {
      this.drawRightWall(x, y, size, columns, rows, ctx);
    }
    if (this.walls.bottomWall) {
      this.drawBottomWall(x, y, size, columns, rows, ctx);
    }
    if (this.walls.leftWall) {
      this.drawLeftWall(x, y, size, columns, rows, ctx);
    }
    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
    if (this.goal) {
      ctx.fillStyle = targetColor;
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

export default Cell;
