import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component { 
    render() {
        const {row, col, isStart, isFinish, isVisited, isWall, onMouseDown, onMouseEnter, onMouseUp} = this.props;
        const className = 
              isFinish ? "node-finish" 
            : isStart ? "node-start" 
            : isVisited ? "node-visited"
            : isWall ? "node-wall"
            : "node";
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