function Avatar(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  this.gridX = 0;
  this.gridY = 0;
  this.update = function (ctx) {
    window.requestAnimationFrame(() => {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    });
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}
let step = 80;

export function startGame(maze, x, y, st = step) {
  const ctx = maze.getContext("2d");

  const avatar = new Avatar(x * 4, y * 4, "purple", x * 5, y * 5, "image", ctx);
  step = st;
  return avatar;
}
export function updateGameArea(maze, player) {
  let ctx = maze.getContext("2d");

  ctx.clearRect(player.x, player.y, player.width, player.height);
  player.newPos(ctx);
  player.update(ctx);
}
export function isValidDirection(maze, row, col, width, height, nextWall) {
  return (
    row >= 0 &&
    row < width &&
    col >= 0 &&
    col < height &&
    !maze[row][col].walls[nextWall]
  );
}
export function canGoThere(grid, x, y, nextWall) {
  var h = grid.length;
  var w = grid[0].length;
  return isValidDirection(grid, x, y, w, h, nextWall);
}
export function moveup(state, player) {
  let currentCell = state.grid[player.gridX][player.gridY];

  if (
    !currentCell.walls.topWall &&
    canGoThere(state.grid, player.gridX - 1, player.gridY, "bottomWall")
  ) {
    player.speedY = -step;
    player.gridX -= 1;
  }
}

export function movedown(state, player) {
  let currentCell = state.grid[player.gridX][player.gridY];

  if (
    !currentCell.walls.bottomWall &&
    canGoThere(state.grid, player.gridX + 1, player.gridY, "topWall")
  ) {
    player.speedY = step;
    player.gridX += 1;
  }
}

export function moveleft(state, player) {
  let currentCell = state.grid[player.gridX][player.gridY];

  if (
    !currentCell.walls.leftWall &&
    canGoThere(state.grid, player.gridX, player.gridY - 1, "rightWall")
  ) {
    player.speedX = -step;
    player.gridY -= 1;
  }
}

export function moveright(state, player) {
  let currentCell = state.grid[player.gridX][player.gridY];

  if (
    !currentCell.walls.rightWall &&
    canGoThere(state.grid, player.gridX, player.gridY + 1, "leftWall")
  ) {
    player.speedX = step;
    player.gridY += 1;
  }
}

export function clearmove(player) {
  player.speedX = 0;
  player.speedY = 0;
}
