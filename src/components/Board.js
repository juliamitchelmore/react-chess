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

            //highlight possible drop squares
            var highlight = false;
            this.props.options.forEach(function(option)
            {
                if(option.x == x && option.y == y)
                {
                    highlight = true;
                }
            });

            //highlight current square on drag so you remember where you started
            var currentSquare = false;
            if(this.props.coords.x == x && this.props.coords.y == y && this.props.options.length > 0)
            {
                currentSquare = true;
            }

            squares.push(<Square key={i} background={bgColor} highlight={highlight} current={currentSquare}/>)

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
