let visited = [];
export let prev = {};

function isValid(maze, visited, width, height, row, col) {
  return (
    row >= 0 && row < width && col >= 0 && col < height && !visited[row][col]
  );
}
export function findShortestPath(maze, src, dest) {
  let h = maze.length;
  let w = maze[0].length;

  for (let i = 0; i < h; i++) {
    visited.push([]);
    for (let j = 0; j < w; j++) {
      visited[i].push(false);
    }
  }

  visited[src.x][src.y] = true;
  let queue = [];
  var s = new Node(src, 0);
  queue.push(s);
  prev[maze[src.x][src.y].name] = null;

  while (queue.length > 0) {
    var curr = queue.pop();

    var point = curr.point;
    if (point.x === dest.x && point.y === dest.y) {
      return;
    }
    let currentCell = maze[point.x][point.y];
    let row = currentCell.rowNum;
    let col = currentCell.colNum;

    var adjCell = null;
    if (
      !currentCell.walls.rightWall &&
      isValid(maze, visited, h, w, row, col + 1)
    ) {
      visited[row][col + 1] = true;
      adjCell = new Node(new Point(row, col + 1), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row][col + 1].name] = maze[row][col];
    }
    if (
      !currentCell.walls.leftWall &&
      isValid(maze, visited, h, w, row, col - 1)
    ) {
      visited[row][col - 1] = true;
      adjCell = new Node(new Point(row, col - 1), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row][col - 1].name] = maze[row][col];
    }
    if (
      !currentCell.walls.bottomWall &&
      isValid(maze, visited, h, w, row + 1, col)
    ) {
      visited[row + 1][col] = true;
      adjCell = new Node(new Point(row + 1, col), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row + 1][col].name] = maze[row][col];
    }
    if (
      !currentCell.walls.topWall &&
      isValid(maze, visited, h, w, row - 1, col)
    ) {
      visited[row - 1][col] = true;
      adjCell = new Node(new Point(row - 1, col), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row - 1][col].name] = maze[row][col];
    }
  }

  return;
}

export function Point(x, y) {
  this.x = x;
  this.y = y;
}

export function Node(pt, dist) {
  this.point = pt;
  this.dist = dist;
}

export function delayRestore(pr, ctx, grid) {
  if (pr === null) {
    return;
  }
  setTimeout(() => {
    pr.heighlight(grid.length, ctx, grid);

    delayRestore(prev[pr.name], ctx, grid);
  }, 100);
}
export function unmark(pr, ctx, grid) {
  if (pr === null) {
    return;
  }
  pr.unmark(grid.length, ctx, grid);

  unmark(prev[pr.name], ctx, grid);
}
