require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';
import Knight from './Knight';

const App = React.createClass({
    getInitialState() {
        return {
            dragging: '',
            mouseX: '',
            mouseY: '',
            knightX: '',
            knightY: '',
            knightLeft: '',
            knightTop: '',
            knightLastX: '',
            knightLastY: ''
        }
    },

    componentDidMount() {
        return (
            this.setState({
                dragging: false,
                mouseX: 0,
                mouseY: 0,
                knightX: 0,
                knightY: 0,
                knightLeft: 0,
                knightTop: 0,
                knightLastX: 0,
                knightLastY: 0
            })
        )
    },

    dragInit() {
        //set dragging
        var obj = ReactDOM.findDOMNode(this.refs.knight);
        this.setState({
            dragging: true,
            knightX: this.state.mouseX - obj.offsetLeft,
            knightY: this.state.mouseY - obj.offsetTop
        })
    },

    handleMouseMove(e) {
        //capture mouse coordinates
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY
        })

        //detect whether mouse within board bounds
        var board = ReactDOM.findDOMNode(this.refs.board),
            boardLeft = board.offsetLeft + 5,
            boardTop = board.offsetTop + 5;
        var insideX = this.state.mouseX >= boardLeft && this.state.mouseX <= boardLeft + board.clientWidth,
            insideY = this.state.mouseY >= boardTop && this.state.mouseY <=  boardTop + board.clientHeight;

        //set new coordinates for knight
        if (this.state.dragging && insideX && insideY) {
            this.setState({
                knightLeft: (this.state.mouseX - this.state.knightX) + 'px',
                knightTop: (this.state.mouseY - this.state.knightY) + 'px'
            })
        }
    },

    destroy() {
        var board = ReactDOM.findDOMNode(this.refs.board),
            boardLeft = board.offsetLeft + 5,
            boardTop = board.offsetTop + 5;

        var insideX = this.state.mouseX >= boardLeft && this.state.mouseX <= boardLeft + board.clientWidth,
            insideY = this.state.mouseY >= boardTop && this.state.mouseY <=  boardTop + board.clientHeight;

        //detect which square mouse is currently over. if mouse outside board, snap back to last position
        var mouseXCoord = Math.floor((this.state.mouseX - board.offsetLeft + 5) / (board.clientWidth / 8)),
            mouseYCoord = Math.floor((this.state.mouseY - board.offsetTop + 5) / (board.clientHeight / 8)),
            snapX = insideX && insideY ? mouseXCoord * (board.clientWidth / 8) + boardLeft : this.state.knightLastX,
            snapY = insideY && insideX ? mouseYCoord * (board.clientHeight / 8) + boardTop : this.state.knightLastY;

        //cancel drag & snap knight to centre of new square
        this.setState({
            dragging: false,
            knightLeft: snapX + 'px',
            knightTop: snapY + 'px',
            knightLastX: snapX,
            knightLastY: snapY
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