import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component { 
    constructor (props) { 
        super(props);
        this.state = {};
    }
    render() {
        const {row, col, isVisited, isStart, isFinish} = this.props;
        const className = 
            isFinish ? 
            "node-finish" : 
            isStart ? "node-start" 
            : "node";
        return (
            <div className={`${className}`}>

            </div>
        )
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
    isVisited: false,
    isStart: false,
    isFinish: false,
}