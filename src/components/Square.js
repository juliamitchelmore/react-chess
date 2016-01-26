import React from 'react';

const Square = React.createClass({
    propTypes: {
        background: React.PropTypes.bool
    },

    render() {
        var bgColor = this.props.background ? 'black' : 'white';

        if(this.props.highlight) bgColor = 'yellow';

        if(this.props.current) bgColor = 'blue';

        return (
          <div className="chess__square" style={{backgroundColor: bgColor}}></div>
        );
    }
})

export default Square;
