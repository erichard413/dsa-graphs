class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) {
      this.nodes.add(v);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for(let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let arr = [];
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    while(toVisitStack.length) {
      let curr = toVisitStack.pop();
      arr.push(curr.value)
      for (let node of curr.adjacent) {
        if (!seen.has(node)) {
          
          toVisitStack.push(node);
          seen.add(node);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let arr = [];
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while(toVisitQueue.length) {
      let curr = toVisitQueue.shift();
      arr.push(curr.value)
      for (let node of curr.adjacent) {
        if (!seen.has(node)) {
          toVisitQueue.push(node);
          seen.add(node);
        }
      }
    }
    return arr;
  }
  hasCycle() {
    let arr = [...this.nodes]
    let toVisitStack = [arr[0]];
    let seen = new Set();
    while(toVisitStack.length) {
      let curr = toVisitStack.pop();
      if (seen.has(curr)) return true;
      for (let node of curr.adjacent) {
        if (!seen.has(node)) {
          toVisitStack.push(node);
        }
      }
      seen.add(curr)
    }
    return false;
  }
  //accepts a source vertex and target vertex and returns the shortest path
  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}
  

module.exports = {Graph, Node}