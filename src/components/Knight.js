import React from 'react';

const Knight = React.createClass({
    render() {
        return (
          <div className="chess__knight" onMouseDown={this.props.dragInit} style={{left: this.props.left, top: this.props.top}} ></div>
        );
    }
})

export default Knight;