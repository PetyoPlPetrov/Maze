# Calendar

This repository will present an application with 2 core functionalitties:
    - Creating a maze with a random size and visualizing the shortest path
    - Playing a game with avatar where the user needs to find the exit. There is a timer and score persistence between games.  

The maze is build using Canvas functionality and react-create app boilerplate.

## Setting up the project

1. Clone the repository on  branch maze-v1

   - the library source code is located into `maze/src` folder

1. To **install dependencies** execute in the terminal `npm install`


## Project structure

```
    - project root
        - scr
            - components for the project
            - styles
            - utils
              - game utils
              - graph utils  
            - MazeWrapper as entry point

```

## Usage
1. Wait some time for the animation of the maze creation to fully finish
2. Generate a maze and visialize the path
3. Play game --> `Continue` button

## Constraints

1. The game functionality is working on 6x6 maze size. The buisiness logic about the coordinates of the avatar needs to be refactored further in order to match a random maze size.
2. The maze is a square

## Interesting facts

 - The timer functionality is a fully accurate timer implementation.
 - The useStorage hook implement publish subscribe mechanism.
 - Integrating the canvas with react as to preserve the fp conceps was the most chalanging part.
 - It is not everyday that I use useImperativeHandle but finnaly I found a good reason to.

## Authors

- **Petyo Petrov**
