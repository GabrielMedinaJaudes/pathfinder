import React, { Component } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            nodes: []
        };
    }
    
    componentDidMount (props) { 
        const nodes = [];
        for (let row = 0; row < 15; row++) { 
            const currentRow = []
            for (let col = 0; col < 15; col++) {
                currentRow.push([])
            }
            nodes.push(currentRow)
        }
        this.setState({nodes})
    }

    render() {
        return (
            <div>
                Foo
            </div>
        );
    }
}