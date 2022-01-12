import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import bfs from '../Algorithms/bfs';
import dfs from '../Algorithms/dfs';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const ROWS = 20;
const COLS = 50;

export default class PathfindingVisualizer extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            grid: [],
            isMousePressed: false,
            isWeights: false,
        };
    }

    resetGrid() {
        document.location.reload();
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
        document.title = "GMJ's Pathfinder";
    }

    toggleWeights() {
        this.setState({isWeights: !this.state.isWeights})
    }


    handleMouseDown(row, col) {
        var newGrid;
        if (this.state.isWeights) {
            newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
        } else {
            newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        }
        this.setState({grid: newGrid, isMousePressed: true});
    }

    handleMouseEnter(row, col) {
        if (this.state.isMousePressed) {
            if (this.state.isWeights) {
                const newGrid = getNewGridWithWeightToggled(this.state.grid, row,  col);
                this.setState({grid: newGrid});
            } else {
                const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
                this.setState({grid: newGrid});
            }
        }

    }

    handleMouseUp() {
        this.setState({isMousePressed: false});
    }

    handleMouseLeave() {
        this.setState({isMousePressed: false});
    }

    animate(visitedNodes) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animateShortestPath(getNodesInShortestPathOrder(this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]));
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                if (!node.isStart && !node.isFinish) { 
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-visited';
                } else if (node.isFinish) { 
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-shortest-path';
                }
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPath) {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node-shortest-path';
            }, 25 * i);
        }
    }

    visualize(algorithm) {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodes;
        if (algorithm === "dijkstra") {
            visitedNodes = dijkstra(grid, startNode, finishNode);
        } else if (algorithm === "bfs") {
            visitedNodes = bfs(grid, startNode, finishNode);
        } else {
            visitedNodes = dfs(grid, startNode, finishNode);
        }
        this.animate(visitedNodes)
    }

    render() {
        const { grid } = this.state;
        return (
        <>
            <Button onClick={() => this.visualize("dijkstra")}>
                Visualize Dijkstra's Algorithm
            </Button>
            <Button onClick={() => this.visualize("bfs")}>
                Visualize Breadth First Search
            </Button>
            <Button onClick={() => this.visualize("dfs")}>
                Visualize Depth First Search
            </Button>
            <Button onClick={() => this.toggleWeights()}>
                Toggle between creating walls and weights
            </Button>
            <Button onClick={() => this.resetGrid()}>
                Reset
            </Button>
            <div className="grid">
                <Typography>
                    {this.state.isWeights ? "You are now creating weights" : "You are now creating walls"}
                </Typography>
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
                                    isVisited={node.isVisited}
                                    isWall={node.isWall}
                                    onMouseDown={(r, c) => this.handleMouseDown(r, c)} 
                                    onMouseEnter={(r, c) => this.handleMouseEnter(r, c)} 
                                    onMouseUp={() => this.handleMouseUp()}
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
    for (let row = 0; row < ROWS; row++) { 
        const currentRow = [];
        for (let col = 0; col < COLS; col++) {
            const currentNode = createNode(row, col)
            currentRow.push(currentNode);
        }
        grid.push(currentRow);
    }
    return grid;
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
            weight: 0,
            isWall: false,
            previousNode: null
        }
    );
}

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-wall';
    newGrid[row][col] = newNode;
    return newGrid;
}

const getNewGridWithWeightToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        distance: 50,
    }
    document.getElementById(`node-${node.row}-${node.col}`).className = 'node-weight';
    newGrid[row][col] = newNode;
    return newGrid;
}