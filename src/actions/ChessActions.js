import AppDispatcher from '../dispatcher/AppDispatcher';
import ChessConstants from '../constants/ChessConstants';

const ChessActions = {

    //for example
    update: function(x, y)
    {
        AppDispatcher.dispatch({
            actionType: ChessConstants.CHESS_UPDATE,
            x: x,
            y: y
        });
    }
}

export default ChessActions;