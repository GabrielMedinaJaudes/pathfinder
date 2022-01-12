import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component { 
    getClassName(props) {
        if (props.isFinish) {
            return ("node-finish");
        } else if (props.isStart) {
            return ("node-start");
        } else if (props.isWeight) {
            return ("node-weight");
        } else if (props.isVisited) {
            return ("node-visited");
        } else if (props.isWall) {
            return ("node-wall");
        } else {
            return ("node");
        }
    }
    
    render() {
        const { row, col, onMouseDown, onMouseEnter, onMouseUp } = this.props;
        const className = this.getClassName(this.props);
        return (
            <div 
                id={`node-${row}-${col}`}
                className={`${className}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        )
    }
}