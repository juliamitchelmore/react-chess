import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ChessConstants from '../constants/ChessConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var _coords = {};
var _options = [];

function create(coords) {
    console.log(coords);
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

function calculateDrop(x, y) {
    //+2h/+1v, +2h/-1v, -2h/+1v, -2h/-1v, +1h/+2v, +1h/-2v, -1h/+2v, -1h/-2v

    _options = [];

    if(x + 2 < 8 && y + 1 < 8)
    {
        _options.push({x: x+2, y: y+1});
    }
    if(x + 2 < 8 && y - 1 >= 0)
    {
        _options.push({x: x+2, y: y-1});
    }
    if(x - 2 >= 0 && y + 1 < 8)
    {
        _options.push({x: x-2, y: y+1});
    }
    if(x - 2 >= 0 && y - 1 >= 0)
    {
        _options.push({x: x-2, y: y-1});
    }
    if(x + 1 < 8 && y + 2 < 8)
    {
        _options.push({x: x+1, y: y+2});
    }
    if(x + 1 < 8 && y - 2 >= 0)
    {
        _options.push({x: x+1, y: y-2});
    }
    if(x - 1 >= 0 && y + 2 < 8)
    {
        _options.push({x: x-1, y: y+2});
    }
    if(x - 1 >= 0 && y - 2 >= 0)
    {
        _options.push({x: x-1, y: y-2});
    }
}

//clear highlight from board
function clearHighlight() {
    _options = [];
}

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
