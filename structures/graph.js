class Graph {
    constructor(vertices, edges) {
        this.vertices = vertices || []
        this.edges = edges || []
    }

    addEdge(edge) {
        if (edge?.length !== 2) {
            return
        }
        const existedEdge = this.edges.find(
            (e) => e[0] === edge[0] && e[1] === edge[1]
        )
        if (!existedEdge) {
            this.edges = [...this.edges, edge]
        }
    }

    removeEdge(edge) {
        this.edges = this.edges.filter(
            (e) => e[0] !== edge[0] && e[1] !== edge[1]
        )
    }

    addVertice(vertice) {
        const existedVertice = this.vertices.find((v) => v === vertice)
        if (!existedVertice) {
            this.vertices = [...this.vertices, vertice]
        }
    }
}

module.exports = {
    Graph,
}
