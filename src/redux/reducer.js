import ChessConstants from './constants';

const initialState = {
  coords: {},
  options: []
}

function calculateDrop (x, y) {
  const possibleMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2]
  ];

  const options = [];

  for (let i = 0; i < possibleMoves.length; i++) {
    const moveX = x + possibleMoves[i][0],
      moveY = y + possibleMoves[i][1];

    if (moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0) {
      options.push({ x: moveX, y: moveY });
    }
  }

  return options
}

export function reducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case ChessConstants.CHESS_CREATE:
      return {
        ...state,
        coords: action.coords
      }
    case ChessConstants.CHESS_UPDATE:
      return {
        ...state,
        coords: { x: action.x, y: action.y }
      }
    case ChessConstants.CHESS_CALCULATE_DROP:
      const options = calculateDrop(action.x, action.y)
      return {
        ...state,
        options
      }
    case ChessConstants.CHESS_CLEAR_HIGHLIGHT:
      return {
        ...state,
        options: []
      }
    default:
      return state
  }
}
