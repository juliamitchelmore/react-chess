require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';
import Knight from './Knight';

const App = React.createClass({
    getInitialState() {
        return {
            knightLeft: '',
            knightTop: ''
        }
    },

    componentDidMount() {
        this.dragging = false;
        this.knightLastX = 55;
        this.knightLastY = 55;

        return (
            this.setState({
                knightLeft: this.knightLastX,
                knightTop: this.knightLastY
            })
        )
    },

    dragInit() {
        //set dragging
        var knight = ReactDOM.findDOMNode(this.refs.knight);
        this.dragging = true;
        this.knightX = this.mouseX - knight.offsetLeft;
        this.knightY = this.mouseY - knight.offsetTop;
    },

    handleMouseMove(e) {
        //capture mouse coordinates
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        //detect whether mouse within board bounds
        this.board = ReactDOM.findDOMNode(this.refs.board);
        var boardLeft = this.board.offsetLeft + 5,
            boardTop = this.board.offsetTop + 5;
        this.insideX = this.mouseX >= boardLeft && this.mouseX <= boardLeft + this.board.clientWidth;
        this.insideY = this.mouseY >= boardTop && this.mouseY <=  boardTop + this.board.clientHeight;

        //set new coordinates for knight
        if (this.dragging && this.insideX && this.insideY) {
            this.setState({
                knightLeft: this.mouseX - this.knightX,
                knightTop: this.mouseY - this.knightY
            })
        }
    },

    destroy() {
        this.dragging = false;

        var boardLeft = this.board.offsetLeft + 5,
            boardTop = this.board.offsetTop + 5;

        //detect which square mouse is currently over from 0 to 7
        var mouseXCoord = Math.floor((this.mouseX - boardLeft) / (this.board.clientWidth / 8)),
            mouseYCoord = Math.floor((this.mouseY - boardTop) / (this.board.clientHeight / 8));

        //if mouse outside board, snap back to last position. else, snap the knight to the middle of the square
        var snapX = this.insideX && this.insideY ? mouseXCoord * (this.board.clientWidth / 8) + boardLeft : this.knightLastX,
            snapY = this.insideY && this.insideX ? mouseYCoord * (this.board.clientHeight / 8) + boardTop : this.knightLastY;

        //set last snapped
        this.knightLastX = snapX;
        this.knightLastY = snapY;

        //cancel drag & snap knight to centre of new square
        this.setState({
            knightLeft: snapX + 'px',
            knightTop: snapY + 'px'
        })
    },

    render() {
        return (
        <div className="page" onMouseMove={this.handleMouseMove} onMouseUp={this.destroy}>
            <Board ref="board"/>
            <Knight left={this.state.knightLeft} top={this.state.knightTop} dragInit={this.dragInit} ref="knight"/>
        </div>
        )
    }
})

export default App;