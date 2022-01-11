export default function dfs (grid, startNode, finishNode) {
    const unvisitedNodes = [startNode];
    const visitedNodes = [];
    while (unvisitedNodes.length) {
        const closestNode = unvisitedNodes.pop();
        if (closestNode.isWall)
            continue;
        if (closestNode.isVisited)
            continue;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === finishNode) {
            startNode.previousNode = null;
            return visitedNodes;
        }
        const neighbors = getUnvisitedNeighbors(closestNode, grid);
        for (const neighbor of neighbors) {
            unvisitedNodes.push(neighbor);
            neighbor.previousNode = closestNode;
        }
    }
    startNode.previousNode = null;
    return visitedNodes;
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) 
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) 
        neighbors.push(grid[row + 1][col]);
    if (col > 0) 
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) 
        neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}