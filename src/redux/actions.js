import ChessConstants from './constants';

export function create (coords) {
  return {
    type: ChessConstants.CHESS_CREATE,
    coords
  }
}

export function update (x, y) {
  return {
    type: ChessConstants.CHESS_UPDATE,
    x,
    y
  }
}

export function calculateDrop (x, y) {
  return {
    type: ChessConstants.CHESS_CALCULATE_DROP,
    x,
    y
  }
}

export function clearHighlight() {
  return {
    type: ChessConstants.CHESS_CLEAR_HIGHLIGHT
  }
}
