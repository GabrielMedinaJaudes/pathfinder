export function bfs (grid, startNode, finishNode) {
    const unvisitedNodes = [];
    unvisitedNodes.push(startNode);
    const visitedNodes = [];
    let counter = 0;
    while (unvisitedNodes.length && counter < 100) {
        const node = unvisitedNodes.shift();
        if (!node.isWall) {
            node.isVisited = true;
            visitedNodes.push(node);
            if (node === finishNode) {
                return visitedNodes;
            }
            addNeighbors(node, grid, unvisitedNodes);
        }    
        counter++;    
    }
}

function addNeighbors(node, grid, unvisitedNodes) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0)
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1)
        neighbors.push(grid[row + 1][col]);
    if (col > 0)
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1)
        neighbors.push(grid[row][col + 1]);
    neighbors.filter(neighbor => !neighbor.isVisited);
    console.log(neighbors);
    neighbors.map(neighbor => unvisitedNodes.push(neighbor));
}