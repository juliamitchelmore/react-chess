import React, { useRef, useEffect } from 'react'

export function Knight({ dragInit, left, top, setRef }) {
  const knightRef = useRef(null)

  useEffect(() => {
    setRef(knightRef.current)
  }, [])

  return (
    <div
      ref={knightRef}
      className="chess__knight"
      onMouseDown={dragInit}
      style={{ left, top }}
    />
  )
}

export default Knight
