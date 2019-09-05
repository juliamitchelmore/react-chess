import React from 'react';
import PropTypes from 'prop-types'

export function Square ({ blackBg, highlight, current }) {
  //square is either black or white, depending on 'blackBg' property
  let bgColor = blackBg ? 'black' : 'white';

  //but if it's a possible drop location, it's yellow
  if (highlight) bgColor = 'yellow';

  //or if it's the current square being dragged from (so you remember where you started), it's blue
  if (current) bgColor = 'blue';

  return (
    <div className="chess__square" style={{ backgroundColor: bgColor }} />
  )
}

Square.propTypes = {
  blackBg: PropTypes.bool,
  highlight: PropTypes.bool,
  current: PropTypes.bool
}
