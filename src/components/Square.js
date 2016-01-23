import React from 'react';

const Square = React.createClass({
    propTypes: {
        background: React.PropTypes.bool,
        x: React.PropTypes.number,
        y: React.PropTypes.number
    },

    render() {
        var bgColor = this.props.background ? 'black' : 'white';

        return (
          <div className="chess__square" style={{backgroundColor: bgColor}}></div>
        );
    }
})

export default Square;
