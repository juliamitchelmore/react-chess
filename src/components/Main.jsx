require('normalize.css')
require('styles/App.scss')

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cookie from 'react-cookie'
import { connect } from 'react-redux'

import { create, update, calculateDrop, clearHighlight } from '../redux/actions'

import { Board } from './Board'
import { Knight } from './Knight'


const mapStateToProps = (state) => ({
  fromStore: {
    coords: state.coords,
    options: state.options
  }
})

const mapDispatchToProps = (dispatch) => ({
  actions: {
    create: (coords) => dispatch(create(coords)),
    update: (x, y) => dispatch(update(x, y)),
    calculateDrop: (x, y) => dispatch(calculateDrop(x, y)),
    clearHighlight: () => dispatch(clearHighlight())
  }
})

class App extends PureComponent {
  static propTypes = {
    fromStore: PropTypes.shape({
      coords: PropTypes.object,
      option: PropTypes.array
    }).isRequired,
    actions: PropTypes.shape({
      create: PropTypes.func,
      update: PropTypes.func,
      calculateDrop: PropTypes.func,
      clearHighlight: PropTypes.func
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      knightLeft: '',
      knightTop: ''
    }
  }

  componentDidMount () {
    const storedCoords = cookie.load('saveCoord') || { x: 0, y: 0 }
    this.props.actions.create(storedCoords)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fromStore.coords.x === undefined && typeof this.props.fromStore.coords.x === 'number') {
      this.initBoard()
    }
  }

  boardRef = (ref) => {
    this.board = ref
  }

  knightRef = (ref) => {
    this.knight = ref
  }

  initBoard = (coords = this.props.fromStore.coords) => {
    if (this.board) {
      this.dragging = false
      const board = ReactDOM.findDOMNode(this.board)
      //initialise knight & move to stored location (from cookie)
      this.knightLastX = 55 + ((board.clientWidth / 8) * coords.x)
      this.knightLastY = 55 + ((board.clientHeight / 8) * coords.y)

      this.setState({
        knightLeft: this.knightLastX,
        knightTop: this.knightLastY
      })
    }
  }

  //on picking up the knight on the board, calculate the possible drop locations
  dragInit = () => {
    //allow knight to be dragged around the page by the cursor
    const knight = ReactDOM.findDOMNode(this.knight)
    this.dragging = true
    this.knightX = this.mouseX - knight.offsetLeft
    this.knightY = this.mouseY - knight.offsetTop

    this.props.actions.calculateDrop(this.props.fromStore.coords.x, this.props.fromStore.coords.y)
  }

  isWithinBounds = (x, y) => {
    const board = ReactDOM.findDOMNode(this.board),
      boardLeft = board.offsetLeft + 5,
      boardTop = board.offsetTop + 5
    const insideX = x >= boardLeft && x <= boardLeft + board.clientWidth,
      insideY = y >= boardTop && y <= boardTop + board.clientHeight

    return insideX && insideY
  }

  handleMouseMove = (e) => {
    //capture mouse coordinates
    this.mouseX = e.clientX
    this.mouseY = e.clientY

    //if mouse within board bounds, drag knight around the page to follow the cursor
    if (this.dragging && this.isWithinBounds(this.mouseX, this.mouseY)) {
      this.setState({
        knightLeft: this.mouseX - this.knightX,
        knightTop: this.mouseY - this.knightY
      })
    }
  }

  destroy = () => {
    //cancel drag
    this.dragging = false

    const board = ReactDOM.findDOMNode(this.board)
    const boardLeft = board.offsetLeft + 5
    const boardTop = board.offsetTop + 5

    //if mouse outside board, snap back to last position.
    //if piece on highlighted square, allow to drop
    //else, snap the knight to the middle of the square
    let snapX = this.knightLastX
    let snapY = this.knightLastY

    if (this.isWithinBounds(this.mouseX, this.mouseY)) {
      //detect which square mouse is currently over from 0 to 7
      const mouseXCoord = Math.floor((this.mouseX - boardLeft) / (board.clientWidth / 8))
      const mouseYCoord = Math.floor((this.mouseY - boardTop) / (board.clientHeight / 8))

      const opt = this.props.fromStore.options

      //check if knight over a possible drop square
      opt.forEach((option) => {
        if (option.x == mouseXCoord && option.y == mouseYCoord) {
          snapX = mouseXCoord * (board.clientWidth / 8) + boardLeft
          snapY = mouseYCoord * (board.clientHeight / 8) + boardTop

          //update coordinate
          this.props.actions.update(mouseXCoord, mouseYCoord)
          cookie.save('saveCoord', { x: mouseXCoord, y: mouseYCoord }) //persist data
        }
      })
    }

    //hide highlight on squares
    this.props.actions.clearHighlight()

    //update previous knight position
    this.knightLastX = snapX
    this.knightLastY = snapY

    //snap knight to centre of new square
    this.setState({
      knightLeft: snapX + 'px',
      knightTop: snapY + 'px'
    })
  }

  render() {
    const { fromStore: { options, coords } } = this.props
    const { knightTop, knightLeft } = this.state

    return (
      <div className="page" onMouseMove={this.handleMouseMove} onMouseUp={this.destroy}>
        <Board coords={coords} options={options} setRef={this.boardRef} />
        <Knight left={knightLeft} top={knightTop} dragInit={this.dragInit} setRef={this.knightRef} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
