import React, { useRef, useEffect } from 'react'

import { Square } from './Square'

export function Board ({ options, coords, setRef }) {
  const chessBoard = useRef(null)

  useEffect(() => {
    setRef(chessBoard.current)
  }, [])

  const getSquares = () => {
    //set background colour for squares
    //each row alternates starting on black or white, and then alternates colour
    const squares = []
    let startBlack = true
    let y = -1
    let x = 0

    for (let i = 0; i < 8 * 8; i++) {
      //new row = new settings
      if (i % 8 == 0) {
        startBlack = !startBlack
        y++
        x = 0
      }

      //alternate colours within row
      const bgBlack = (i % 2 == 0 ? startBlack : !startBlack)

      //highlight possible drop squares
      let highlight = false
      if (options) {
        options.forEach(function(option) {
          if (option.x == x && option.y == y) {
            highlight = true
          }
        })
      }

      //highlight current square on drag so you remember where you started
      let currentSquare = false
      if (coords && coords.x == x && coords.y == y && options.length > 0) {
        currentSquare = true
      }

      squares.push(<Square key={i} blackBg={bgBlack} highlight={highlight} current={currentSquare}/>)

      x++
    }
    return squares
  }

  return (
    <div className="chess__board" ref={chessBoard}>
      {getSquares()}
    </div>
  )
}
