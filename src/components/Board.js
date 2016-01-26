import React from 'react';

import Square from './Square';

const Board = React.createClass({
    render() {
        //set background colour for squares
        //each row alternates starting on black or white, and then alternates colour
        var squares = [];
        var startBlack = true, y = -1, x = 0;
        for(var i = 0; i < 8*8; i++)
        {
            //new row = new settings
            if(i % 8 == 0)
            {
                startBlack = !startBlack;
                y++;
                x = 0;
            }

            //alternate colours within row
            var bgColor = (i % 2 == 0 ? startBlack : !startBlack);
            var highlight = false;

            this.props.options.forEach(function(option)
            {
                if(option.x == x && option.y == y)
                {
                    highlight = true;
                }
            });

            squares.push(<Square key={i} background={bgColor} x={x} y={y} highlight={highlight} />)

            x++;
        }

        return (
          <div className="chess__board">
            {squares}
          </div>
        );
    }
})

export default Board;
