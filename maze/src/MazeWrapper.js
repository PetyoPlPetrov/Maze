import React, {useEffect, useMemo, useState} from "react";
import './styles/index.css'
import './styles/maze.css'
import {
  findShortestPath,
  delayRestore,
  Point,
  unmark,
  prev,
} from "./utils/graphUtils";

const Cell = ({top, right, bottom, left,heighlight})=>{
  return <div
   className={`maze-cell  ${heighlight? 'heighlight':'eee'} ${top?'missingTop':''} ${right?'missingRight':''} ${bottom?'missingBottom':''} ${left?'missingLeft':''}`}
   
   ></div>
}

function findUnvisitedNeighboors([row,col],grid, visited){
    let neighbors = [];
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid[0].length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;
    if (top !== undefined && !visited[top[0]][top[1]]) {
      neighbors.push(top);
    }
    if (right !== undefined&& !visited[right[0]][right[1]]) {
      neighbors.push(right);
    }
    if (bottom !== undefined&& !visited[bottom[0]][bottom[1]]) {
      neighbors.push(bottom);
    }
    if (left !== undefined&& !visited[left[0]][left[1]]) {

      neighbors.push(left);
    }
  return neighbors
};


function removeWalls(cell1, cell2,walls){
  let x = cell1[0] - cell2[0];
  let y = cell1[1] - cell2[1];

  // console.log('X',x)
  // console.log('Y',y)

  if(y===1){
    walls[cell1[0]][cell1[1]]+=' left';
    walls[cell2[0]][cell2[1]]+=' right';
  }else if (y === -1) {
    walls[cell1[0]][cell1[1]]+=' right';
    walls[cell2[0]][cell2[1]]+=' left';
  }


  if (x === 1) {
    walls[cell1[0]][cell1[1]]+=' top';
    walls[cell2[0]][cell2[1]]+=' bottom';
  } else if (x === -1) {
    walls[cell1[0]][cell1[1]]+=' bottom';
    walls[cell2[0]][cell2[1]]+=' top';
  }

}
const mark = (el,highligted,set,prev)=>{
  if (el === null) {
    return;
  }
  highligted[el[0]][el[1]]=true;
  set([...highligted]);
  setTimeout(()=>mark(prev[`${el[0]},${el[1]}`],highligted,set,prev),100)
}
const x = 6;
const y = 9;

const App = () => {
  const [walls, setWalls] = useState( Array(x).fill('').map(()=>Array(y).fill('')))
  const [highligted, setHighligted] = useState( Array(x).fill(false).map(()=>Array(y).fill(false)))
  const maze = useMemo(()=>[...Array(x).keys()].map((row)=>{
    return [...Array(y).keys()].map(col=> [row,col])
  }),[])

  useEffect(()=>{
    let stack = [];
    let visited = Array(x).fill().map(()=>Array(y).fill())
    let missingWalls = Array(x).fill('').map(()=>Array(y).fill(''))
    let start = maze[0][0];
    visited[0][0]=true
    stack.push(start);
    

    while(stack.length>0){
      let current = stack.pop();
      //console.log('current ', current)
      let unvisitedNeihboors = findUnvisitedNeighboors(current,maze, visited);
     // console.log(unvisitedNeihboors)
      if(unvisitedNeihboors.length>0){
        stack.push(current);
      }else{
        continue
      }
      let randomNeighboor =unvisitedNeihboors.length>1? unvisitedNeihboors[Math.floor(Math.random() * unvisitedNeihboors.length)]: unvisitedNeihboors[0];
      //console.log('randomNeighboor', randomNeighboor);


      //remove wall
        removeWalls(current, randomNeighboor,missingWalls)
        // console.log(missingWalls)
        // console.log(visited)
      //mark as visited
      visited[randomNeighboor[0]][randomNeighboor[1]]=true;

      stack.push(randomNeighboor)
      //debugger
      //stack=[]

    }
     //console.log(visited)
    // console.log(missingWalls)
    setWalls(missingWalls)

  },[maze])

  const onShow = ()=>{
    var source = new Point(0, 0);
    var dest = new Point(x - 1, y - 1);

    findShortestPath(maze, source, dest,walls);

    let curr = prev[`${dest.x},${dest.y}`];
    highligted[x-1][y-1]=true
    mark(curr,highligted,setHighligted,prev)
    
  }

  return (<>
    <div className='maze-wrapper grid' style={{gridTemplateColumns: `repeat(${y}, 1fr)`,gridTemplateRows: `repeat(${x},1fr)`}}>
      {
        maze.map(cells=>{
          return cells.map((cell,i)=>{
              const missingBorders = walls[cell[0]][cell[1]]

              return <Cell
            heighlight={highligted[cell[0]][cell[1]]} 
            key={cell.toString()} 
            top={missingBorders.includes('top')}
            bottom={missingBorders.includes('bottom')}
            left={missingBorders.includes('left')}
            right={missingBorders.includes('right')}          
            />
          })
        })
      }
    </div>
    <button onClick={onShow}>Show path</button>

    </>
  );
};

export default App;
