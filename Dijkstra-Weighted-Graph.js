const PriorityQueue = require("./PriorityQueue.js");

/*
    Weighted graphs contain an object with {node: {The Values}, Weight {The weight of the edge between two verticies}}
*/

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        const list = this.adjacencyList;
        if (!list[vertex]) list[vertex] = [];
    }

    addEdge(v1, v2, weight) {
        const list = this.adjacencyList;
        if (list[v1]) list[v1].push({node: v2, weight});
        if (list[v2]) list[v2].push({node: v1, weight});
    }

    removeEdge(v1, v2) {
        const list = this.adjacencyList;
        if (list[v1]) list[v1] = list[v1].filter(v => v.node !== v2);
        if (list[v2]) list[v2] = list[v2].filter(v => v.node !== v1);
    }

    removeVertex(vertex) {
        const list = this.adjacencyList;

        list[vertex].forEach(neighbor => {
            this.removeEdge(vertex, neighbor.node);
        });

        delete list[vertex];
    }

    Dijkstra(startVertex, endVertex) {
      const list = this.adjacencyList;
      if (!list[startVertex] || !list[endVertex]) return null;
      const distances = {}; //Stores distances from different vertex
      const previous = {};
      const path = []; //Used to return the shorted-path   
      const pq = new PriorityQueue();

      for (let vertex in list) {
        if (vertex === startVertex) {
          distances[vertex] = 0;
          pq.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity; //Distances are Infinity because we dont know their edge weights yet 
          pq.enqueue(vertex, Infinity);
        }

        previous[vertex] = null; //This is kept to find the best possible vertex to current vertex
      }

      while (pq.values.length) { //While there is something in the priority queue
        let vertex = pq.dequeue();
        if (vertex === endVertex) {
          while (previous[vertex]) {
            path.push(vertex);
            vertex = previous[vertex];
          }
          path.push(startVertex);
          return path.reverse();
        };

        if (vertex || distances[vertex] !== Infinity) {
          list[vertex].forEach(neighbor => {
            //Calculate the distance from current vertex to neighboring node
            let distance = distances[vertex] + neighbor.weight;

            if (distance < distances[neighbor.node]) {
              //Updating new smallest distance to neighbor
              distances[neighbor.node] = distance;
              //Updating previous and basically how we got to next neighbor
              previous[neighbor.node] = vertex;

              //Enqueue in priority queue with new priority
              pq.enqueue(neighbor.node, distance);
            }
          });
        }
      }
    } 
}
