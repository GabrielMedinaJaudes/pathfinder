export function bfs (grid, startNode, finishNode) {
    const unvisitedNodes = [startNode];
    const visitedNodes = [];
    var counter = 0;
    while (unvisitedNodes.length && counter < 700) {
        const closestNode = unvisitedNodes.shift();
        if (visitedNodes.includes(closestNode)) {
            console.log("repeat");
        }
        console.log(`R: ${closestNode.row}, C: ${closestNode.col}`)
        if (closestNode.isWall)
            continue;
        if (closestNode.isVisited)
            continue;
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === finishNode)
            return visitedNodes;
        const neighbors = getUnvisitedNeighbors(closestNode, grid);
        for (const neighbor of neighbors) {
            unvisitedNodes.push(neighbor);
        }
        
        counter += 1;
    }
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
    neighbors.forEach(neighbor => neighbor.previousNode = node);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}