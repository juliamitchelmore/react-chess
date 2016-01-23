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
            knightTop: ''
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
                knightTop: 0
            })
        )
    },

    dragInit() {
        var obj = ReactDOM.findDOMNode(this.refs.knight);
        this.setState({
            dragging: true,
            knightX: this.state.mouseX - obj.offsetLeft,
            knightY: this.state.mouseY - obj.offsetTop
        })
    },

    handleMouseMove(e) {
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY
        })

        var board = ReactDOM.findDOMNode(this.refs.board);

        var insideX = this.state.mouseX >= board.offsetLeft + 20 && this.state.mouseX <= board.offsetLeft + board.clientWidth - 30,
            insideY = this.state.mouseY >= board.offsetTop + 20 && this.state.mouseY <= board.clientHeight - board.offsetTop - 30;

        if (this.state.dragging && insideX && insideY) {
            this.setState({
                knightLeft: (this.state.mouseX - this.state.knightX) + 'px',
                knightTop: (this.state.mouseY - this.state.knightY) + 'px'
            })
        }
    },

    destroy() {
        this.setState({
            dragging: false
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