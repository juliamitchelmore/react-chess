import AppDispatcher from '../dispatcher/AppDispatcher';
import ChessConstants from '../constants/ChessConstants';

const ChessActions = {
    create: function()
    {
        AppDispatcher.dispatch({
            actionType: ChessConstants.CHESS_CREATE
        });
    },

    update: function(x, y)
    {
        AppDispatcher.dispatch({
            actionType: ChessConstants.CHESS_UPDATE,
            x: x,
            y: y
        });
    },

    calculateDrop: function(x, y)
    {
        AppDispatcher.dispatch({
            actionType: ChessConstants.CHESS_CALCULATE_DROP,
            x: x,
            y: y
        });
    },

    clearHighlight: function()
    {
        AppDispatcher.dispatch({
            actionType: ChessConstants.CHESS_CLEAR_HIGHLIGHT
        });
    }
}

export default ChessActions;