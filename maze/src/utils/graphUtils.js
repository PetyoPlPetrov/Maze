let visited = [];
export let prev = {};

function isValid(maze, visited, width, height, row, col) {
  return (
    row >= 0 && row < width && col >= 0 && col < height && !visited[row][col]
  );
}
export function findShortestPath(maze, src, dest, walls) {
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
  prev[maze[src.x][src.y].toString()] = null;
  

  while (queue.length > 0) {
    var curr = queue.pop();

    var point = curr.point;
    if (point.x === dest.x && point.y === dest.y) {
      return prev
    }
    let currentCell = maze[point.x][point.y];
    let row = currentCell[0];
    let col = currentCell[1];

    var adjCell = null;
    let dir = walls[currentCell[0]][currentCell[1]]

    if (
      dir.includes('right') &&
      isValid(maze, visited, h, w, row, col + 1)
    ) {
      visited[row][col + 1] = true;
      adjCell = new Node(new Point(row, col + 1), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row][col + 1].toString()] = maze[row][col];
    }
    
    if (
      walls[currentCell[0]][currentCell[1]].includes('left') &&
      isValid(maze, visited, h, w, row, col - 1)
    ) {
      visited[row][col - 1] = true;
      adjCell = new Node(new Point(row, col - 1), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row][col - 1].toString()] = maze[row][col];
    }
    if (
      walls[currentCell[0]][currentCell[1]].includes('bottom') &&
      isValid(maze, visited, h, w, row + 1, col)
    ) {
      visited[row + 1][col] = true;
      adjCell = new Node(new Point(row + 1, col), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row + 1][col].toString()] = maze[row][col];
    }
    if (
      walls[currentCell[0]][currentCell[1]].includes('top')&&
      isValid(maze, visited, h, w, row - 1, col)
    ) {
      visited[row - 1][col] = true;
      adjCell = new Node(new Point(row - 1, col), curr.dist + 1);
      queue.push(adjCell);
      prev[maze[row - 1][col].toString()] = maze[row][col];
    }
  }

  return prev
}

export function Point(x, y) {
  this.x = x;
  this.y = y;
}

export function Node(pt, dist) {
  this.point = pt;
  this.dist = dist;
}

export function findUnvisitedNeighboors([row, col], grid, visited) {
  let neighbors = [];
  let top = row !== 0 ? grid[row - 1][col] : undefined;
  let right = col !== grid[0].length - 1 ? grid[row][col + 1] : undefined;
  let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
  let left = col !== 0 ? grid[row][col - 1] : undefined;
  if (top !== undefined && !visited[top[0]][top[1]]) {
    neighbors.push(top);
  }
  if (right !== undefined && !visited[right[0]][right[1]]) {
    neighbors.push(right);
  }
  if (bottom !== undefined && !visited[bottom[0]][bottom[1]]) {
    neighbors.push(bottom);
  }
  if (left !== undefined && !visited[left[0]][left[1]]) {
    neighbors.push(left);
  }
  return neighbors;
}

export function removeWalls(cell1, cell2, walls) {
  let x = cell1[0] - cell2[0];
  let y = cell1[1] - cell2[1];

  // console.log('X',x)
  // console.log('Y',y)

  if (y === 1) {
    walls[cell1[0]][cell1[1]] += " left";
    walls[cell2[0]][cell2[1]] += " right";
  } else if (y === -1) {
    walls[cell1[0]][cell1[1]] += " right";
    walls[cell2[0]][cell2[1]] += " left";
  }

  if (x === 1) {
    walls[cell1[0]][cell1[1]] += " top";
    walls[cell2[0]][cell2[1]] += " bottom";
  } else if (x === -1) {
    walls[cell1[0]][cell1[1]] += " bottom";
    walls[cell2[0]][cell2[1]] += " top";
  }
}
export const mark = (el, highligted, set, prev) => {
  if (el === null) {
    return;
  }
  highligted[el[0]][el[1]] = true;
  set([...highligted]);
  setTimeout(() => mark(prev[`${el[0]},${el[1]}`], highligted, set, prev), 10);
};
