import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ChessConstants from '../constants/ChessConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var _coords = {};
var _options = [];

//set initial coordinates from cookie (or 0,0)
function create(coords) {
    if(coords)
    {
        _coords.x = coords.x;
        _coords.y = coords.y;
    }
    else
    {
        _coords.x = 0;
        _coords.y = 0;
    }
}

//store new coordinate
function update(x, y) {
    _coords.x = x;
    _coords.y = y;
}

//calculate the possible positions where the knight can be placed
function calculateDrop(x, y) {
    var possibleMoves = [[2,1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1,2], [-1,-2]];

    _options = [];

    for(var i = 0; i < possibleMoves.length; i++)
    {
        var moveX = x + possibleMoves[i][0],
            moveY = y + possibleMoves[i][1];

        if(moveX < 8 && moveX >= 0 && moveY < 8 && moveY >= 0)
        {
            _options.push({x: moveX, y: moveY});
        }
    }
}

//clear highlight from board
function clearHighlight() {
    _options = [];
}

//flux store helpers
var ChessStore = assign({}, EventEmitter.prototype, {
  getCoords: function() {
    return _coords;
  },

  getOptions: function() {
    return _options;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

//register dispatch event
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ChessConstants.CHESS_CREATE:
        var coords = action.coords;

        create(coords);
        ChessStore.emitChange();
      break;

    case ChessConstants.CHESS_UPDATE:
      var x = action.x;
      var y = action.y;

        update(x, y);
        ChessStore.emitChange();
      break;

    case ChessConstants.CHESS_CALCULATE_DROP:
      var x = action.x;
      var y = action.y;

        calculateDrop(x, y);
        ChessStore.emitChange();
      break;

    case ChessConstants.CHESS_CLEAR_HIGHLIGHT:
        clearHighlight();
        ChessStore.emitChange();
      break;

    default:
      // no op
  }
});

export default ChessStore;
