import React from 'react';

import Square from './Square';

const Board = React.createClass({
    render() {

        var squares = [];
        var startBlack = true, x = -1, y = 0;
        for(var i = 0; i < 8*8; i++)
        {
            if(i % 8 == 0)
            {
                startBlack = !startBlack;
                x++;
                y = 0;
            }

            var bgColor = (i % 2 == 0 ? startBlack : !startBlack);

            squares.push(<Square key={i} background={bgColor} x={x} y={y} />)

            y++;
        }

        return (
          <div className="chess__board">
            {squares}
          </div>
        );
    }
})

export default Board;
