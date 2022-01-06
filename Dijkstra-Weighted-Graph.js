class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }

  class PriorityQueue {
    constructor() {
      this.values = [];
    }

    swap(val1, val2) {
      [this.values[val2], this.values[val1]] = [this.values[val1], this.values[val2]];
    }

    enqueue(val, priority) {
      let node = new Node(val, priority);
      this.values.push(node);
      this.bubbleUp();
    }

    bubbleUp() {
      let currentIdx = this.values.length - 1;
      let current = this.values[currentIdx];

      while (currentIdx > 0) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        let parent = this.values[parentIdx];
        if (parent.priority <= current.priority) break;
        this.swap(parentIdx, currentIdx);
        currentIdx = parentIdx;
      }
    }
      dequeue() {
        let min = this.values[0];
        let max = this.values.pop();

        if (this.values.length > 0) {
          this.values[0] = max;
          this.trickleDown();
        } else {
            return null;
        }

        return min.val;
      }

      trickleDown() {
        let currentIdx = 0;
        let current = this.values[0];
        let length = this.values.length;

        while (true) {
          let leftChildIdx = 2  * currentIdx + 1;
          let rightChildIdx = 2 * currentIdx + 2;
          let leftChild = leftChildIdx > length ? null : this.values[leftChildIdx];
          let rightChild = rightChildIdx > length ? null : this.values[rightChildIdx];
          let swap = null;

          if (leftChild && leftChild.priority < current.priority) {
            swap = leftChildIdx;
          }

          if (rightChild && ((!swap && rightChild.priority < current.priority) || (swap &&rightChild.priority < leftChild.priority))) {
            swap = rightChildIdx;
          }

          if (!swap) break;

          this.swap(swap, currentIdx);
          currentIdx = swap;
        }

      }
  }


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
      const distances = {};
      const previous = {};
      const path = [];
      const pq = new PriorityQueue();

      for (let vertex in list) {
        if (vertex === startVertex) {
          distances[vertex] = 0;
          pq.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          pq.enqueue(vertex, Infinity);
        }

        previous[vertex] = null;
      }

      while (pq.values.length) {
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
