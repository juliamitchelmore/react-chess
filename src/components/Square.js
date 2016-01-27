import React from 'react';

const Square = React.createClass({
    propTypes: {
        blackBg: React.PropTypes.bool
    },

    render() {
        //square is either black or white, depending on 'blackBg' property
        var bgColor = this.props.blackBg ? 'black' : 'white';

        //but if it's a possible drop location, it's yellow
        if(this.props.highlight) bgColor = 'yellow';

        //or if it's the current square being dragged from (so you remember where you started), it's blue
        if(this.props.current) bgColor = 'blue';

        return (
          <div className="chess__square" style={{backgroundColor: bgColor}}></div>
        );
    }
})

export default Square;
