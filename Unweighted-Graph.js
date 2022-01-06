class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        const list = this.adjacencyList;
        if (!list[vertex]) list[vertex] = [];
    }

    addEdge(v1, v2) {
        const list = this.adjacencyList;
        if (list[v1]) list[v1].push(v2);
        if (list[v2]) list[v2].push(v1);
    }

    removeEdge(v1, v2) {
        const list = this.adjacencyList;
        if (list[v1]) list[v1] = list[v1].filter(v => v !== v2);
        if (list[v2]) list[v2] = list[v2].filter(v => v !== v1);
    }

    removeVertex(vertex) {
        const list = this.adjacencyList;

        list[vertex].forEach(neighbor => {
            this.removeEdge(vertex, neighbor);
        });

        delete list[vertex];
    } 

    dfsRecursive(startVertex) {
        const list = this.adjacencyList;
        if (!list[startVertex]) return null;
        const visited = {};
        const result = [];

        const dfs = (vertex) => {
            visited[vertex] = true;
            result.push(vertex);

            list[vertex].forEach(neighbor => {
                if (!visited[neighbor]) dfs(neighbor);
            });
        }

        dfs(startVertex);
        return result;
    }

    dfsIterative(startVertex) {
        const list = this.adjacencyList;
        if (!list[startVertex]) return null;
        const stack = [startVertex];
        const visited = {[startVertex]: true};
        const result = [];

        while (stack.length) {
            const vertex = stack.pop();
            result.push(vertex);

            list[vertex].forEach(neighbor => {
                if (!visited[neighbor]) stack.push(neighbor);
                visited[neighbor] = true;
            });
        }

        return result;
    }

    bfs(startVertex) {
        const list = this.adjacencyList;
        const queue = [startVertex];
        const visited = {[startVertex]: true};
        const result = [];

        while (queue.length) {
            const vertex = queue.shift();
            result.push(vertex);

            list[vertex].forEach(neighbor => {
                if (!visited[neighbor]) queue.push(neighbor);
                visited[neighbor] = true;
            });
        }

        return result;
    }
}
