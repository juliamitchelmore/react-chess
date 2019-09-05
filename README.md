# React Chess
A mini application featuring a draggable knight by [Julia Mitchelmore](http://juliamitchelmore.com)

## Installation
Clone the project, then run

    yarn install

Once the dependencies have been installed, run

    yarn start
    
to start the webpack dev server & view the application.

## Features

 - Drag and drop a knight (circle) around the board
 - When you drag the knight, it will highlight the available places you can move it to in **yellow**. The square you started from will be highlighted **blue**.
 - Drop the knight on a yellow square to move it around the board
 - If you drag the knight outside of the board, it will snap back to it's original spot
 - If you try and drop the knight on a non-yellow square, it will snap back to it's original spot
 - If you refresh the page, your knight's position will be returned to where you last dropped it!

## Notes

 - This is a functional app, not a pretty one. It's not responsive, looks ugly, and goes against all my design aesthetics. However, it serves its purpose.
 - Built with React and with a Redux implementation
 - Has decent test coverage of store functions & components. To run tests, use `yarn test` **[DEPRECATED]**
 - Data won't persist between browsers :(

