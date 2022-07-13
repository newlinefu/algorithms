class Edge {
    constructor(from, to, weight) {
        this.from = from
        this.to = to
        this.weight = weight
    }
}

class Graph {
    constructor(vertices, edges) {
        this.vertices = vertices || []
        this.edges = edges?.map((e) => new Edge(e[0], e[1], e[2]))
    }

    addEdge(edge) {
        if (edge?.length !== 2) {
            return
        }
        const existedEdge = this.edges.find(
            (e) => e.from === edge[0] && e.to === edge[1]
        )
        if (!existedEdge) {
            this.edges = [
                ...this.edges,
                new Edge(edge[0], edge[1], edge[2] || 0),
            ]
        }
    }

    removeEdge(edge) {
        this.edges = this.edges.filter(
            (e) => e.from !== edge[0] && e.to !== edge[1]
        )
    }

    addVertice(vertice) {
        const existedVertice = this.vertices.find((v) => v === vertice)
        if (!existedVertice) {
            this.vertices = [...this.vertices, vertice]
        }
    }

    objectMap() {
        const result = {}
        this.vertices.forEach((v) => {
            result[v] = []
        })
        this.edges.forEach((e) => {
            const key = e.from
            result[key].push(e.to)
        })
        return result
    }

    #dfsRecursive(objectMap, actualNode, targetNode, visited, callback) {
        const isActualNodeVisited = !!visited.find((v) => v === actualNode)
        const isActualNodeTarget = targetNode === actualNode

        if (isActualNodeTarget) return true
        if (isActualNodeVisited) return false

        const actualNodeNeighbours = objectMap[actualNode]

        visited.push(actualNode)
        callback(actualNode)
        for (let i = 0; i < actualNodeNeighbours.length; i++) {
            const neighbour = actualNodeNeighbours[i]
            const isNeighbourVisited = !!visited.find((v) => v === neighbour)
            if (!isNeighbourVisited) {
                const reached = this.#dfsRecursive(
                    objectMap,
                    neighbour,
                    targetNode,
                    visited,
                    callback
                )
                if (reached) {
                    return true
                }
            }
        }
        return false
    }

    dfs(targetNode, callback = () => {}) {
        const objectMap = this.objectMap()
        return this.#dfsRecursive(
            objectMap,
            this.vertices[0],
            targetNode,
            [],
            callback
        )
    }

    bfs(startFrom, targetNode, callback = () => {}) {
        const visited = []
        const queue = []
        const objectMap = this.objectMap()

        while (queue.length > 0) {
            const actualNode = queue.shift()
            visited.push(startFrom)
            callback(actualNode)

            const neighbours = objectMap[actualNode]

            for (let i = 0; i < neighbours.length; i++) {
                const isNeighbourVisited = visited.find((v) => v === actualNode)
                if (isNeighbourVisited) {
                    continue
                }
                const neighbour = neighbours[i]
                if (neighbour === targetNode) {
                    return true
                }
                queue.push(neighbour)
            }
        }

        return false
    }

    dijkstra(startedNode) {
        const objectMap = this.objectMap()
        const visited = []
        const distances = {}
        const paths = {}

        this.vertices.forEach((v) => {
            distances[v] = Number.MAX_VALUE
            paths[v] = []
        })
        distances[startedNode] = 0
        const findNodeWithMinimumDistance = (distances, visited) => {
            let minDistance = Number.MAX_VALUE
            let minDistanceNode = null

            Object.entries(distances).forEach(([node, distance]) => {
                const isNodeVisited = !!visited.find((v) => v === node)
                if (!isNodeVisited && distance < minDistance) {
                    minDistance = distance
                    minDistanceNode = node
                }
            })

            return minDistanceNode
        }
        const handleNode = (node, distances, paths, visited) => {
            const neighbours = objectMap[node]
            const nodeDistance = distances[node]
            neighbours.forEach((n) => {
                const edgeDistance = this.edges.find(
                    (e) => e.from === node && e.to === n
                ).weight
                const neighbourDistance = distances[n]
                if (neighbourDistance > edgeDistance + nodeDistance) {
                    distances[n] = edgeDistance + nodeDistance
                    paths[n].push(node)
                }
            })
            visited.push(node)
        }

        let actualNode = findNodeWithMinimumDistance(distances, visited)

        while (actualNode) {
            handleNode(actualNode, distances, paths, visited)
            actualNode = findNodeWithMinimumDistance(distances, visited)
        }
        return distances
    }
}

module.exports = {
    Graph,
}
