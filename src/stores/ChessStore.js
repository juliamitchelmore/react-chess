import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ChessConstants from '../constants/ChessConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var _coords = {};

//store new coordinate
function update(x, y) {
    _coords.x = x;
    _coords.y = y;
}

var ChessStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _coords;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ChessConstants.CHESS_UPDATE:
      var x = action.x;
      var y = action.y;
      if (x && y) {
        update(x, y);
        ChessStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

export default ChessStore;
