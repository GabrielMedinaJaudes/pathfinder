import React, { Component } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import { dijkstra } from '../Algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PathfindingVisualizer extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            grid: [],
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid})
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodes)
    }

    render() {
        const { grid } = this.state;
        return (
        <>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => 
                                <Node
                                    key={nodeIdx}
                                    row={node.row}
                                    col={node.col}
                                    isStart={node.isStart}
                                    isFinish={node.isFinish}
                                ></Node>)}
                        </div>
                    )
                })}
            </div>
        </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) { 
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            const currentNode = createNode(row, col)
            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
    return grid
} 

const createNode = (row, col) => {
    return (
        {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null
        }
    )
}