require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

import ChessStore from '../stores/ChessStore';
import ChessActions from '../actions/ChessActions';

import Board from './Board';
import Knight from './Knight';


const App = React.createClass({
    getInitialState() {
        return {
            coords: ChessStore.getCoords(),
            knightLeft: '',
            knightTop: '',
            savedCoords: cookie.load('saveCoord')
        }
    },

    componentDidMount() {
        this.dragging = false;
        var board = ReactDOM.findDOMNode(this.refs.board);
        //initialise knight & move to stored location (from cookie)
        ChessActions.create(this.state.savedCoords);
        this.knightLastX = 55 + ((board.clientWidth / 8) * this.state.coords.x);
        this.knightLastY = 55 + ((board.clientHeight / 8) * this.state.coords.y);

        return (
            this.setState({
                knightLeft: this.knightLastX,
                knightTop: this.knightLastY
            })
        )
    },

    //on picking up the knight on the board, calculate the possible drop locations
    dragInit() {
        //allow knight to be dragged around the page by the cursor
        var knight = ReactDOM.findDOMNode(this.refs.knight);
        this.dragging = true;
        this.knightX = this.mouseX - knight.offsetLeft;
        this.knightY = this.mouseY - knight.offsetTop;

        ChessActions.calculateDrop(this.state.coords.x, this.state.coords.y);
    },

    isWithinBounds(x, y) {
        var board = ReactDOM.findDOMNode(this.refs.board),
            boardLeft = board.offsetLeft + 5,
            boardTop = board.offsetTop + 5;
        var insideX = x >= boardLeft && x <= boardLeft + board.clientWidth,
            insideY = y >= boardTop && y <=  boardTop + board.clientHeight;

        return insideX && insideY;
    },

    handleMouseMove(e) {
        //capture mouse coordinates
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        //if mouse within board bounds, drag knight around the page to follow the cursor
        if (this.dragging && this.isWithinBounds(this.mouseX, this.mouseY)) {
            this.setState({
                knightLeft: this.mouseX - this.knightX,
                knightTop: this.mouseY - this.knightY
            })
        }
    },

    destroy() {
        //cancel drag
        this.dragging = false;

        var board = ReactDOM.findDOMNode(this.refs.board),
            boardLeft = board.offsetLeft + 5,
            boardTop = board.offsetTop + 5;

        //if mouse outside board, snap back to last position.
        //if piece on highlighted square, allow to drop
        //else, snap the knight to the middle of the square
        var snapX = this.knightLastX, snapY = this.knightLastY;

        if(this.isWithinBounds(this.mouseX, this.mouseY))
        {
            //detect which square mouse is currently over from 0 to 7
            var mouseXCoord = Math.floor((this.mouseX - boardLeft) / (board.clientWidth / 8)),
                mouseYCoord = Math.floor((this.mouseY - boardTop) / (board.clientHeight / 8));

            var opt = ChessStore.getOptions();

            //check if knight over a possible drop square
            opt.forEach(function(option)
            {
                if(option.x == mouseXCoord && option.y == mouseYCoord)
                {
                    snapX = mouseXCoord * (board.clientWidth / 8) + boardLeft;
                    snapY = mouseYCoord * (board.clientHeight / 8) + boardTop;

                    //update coordinate
                    ChessActions.update(mouseXCoord, mouseYCoord);
                    cookie.save('saveCoord', {x: mouseXCoord, y: mouseYCoord}); //persist data
                }
            })
        }

        //hide highlight on squares
        ChessActions.clearHighlight();

        //update previous knight position
        this.knightLastX = snapX;
        this.knightLastY = snapY;

        //snap knight to centre of new square
        this.setState({
            knightLeft: snapX + 'px',
            knightTop: snapY + 'px'
        })
    },

    render() {
        var coords = this.state.coords;
        var options = ChessStore.getOptions();

        return (
        <div className="page" onMouseMove={this.handleMouseMove} onMouseUp={this.destroy}>
            <Board ref="board" coords={coords} options={options}/>
            <Knight left={this.state.knightLeft} top={this.state.knightTop} dragInit={this.dragInit} ref="knight"/>
        </div>
        )
    }
})

export default App;