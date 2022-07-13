class Node {
    constructor(value, child) {
        this.value = value
        this.child = {
            left: child?.left || null,
            right: child?.right || null,
        }
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }

    add(value, node) {
        if (!this.root) {
            this.root = new Node(value)
        }
        const actualNode = node || this.root
        if (value === actualNode.value) {
            return
        }
        if (value > actualNode.value) {
            if (actualNode.child.right == null) {
                actualNode.child.right = new Node(value)
            } else {
                this.add(value, actualNode.child.right)
            }
        } else {
            if (actualNode.child.left == null) {
                actualNode.child.left = new Node(value)
            } else {
                this.add(value, actualNode.child.left)
            }
        }
    }

    remove(value) {
        let actualNode = this.root
        if (actualNode == null) {
            return
        }
        const { node, parent, left: isLeftNode } = this.findNode(value, actualNode)
        if (parent == null) {
            this.root = null;
            return
        }
        if (!node.child.left && !node.child.right) {
            if (isLeftNode) {
                parent.child.left = null
            } else {
                parent.child.right = null
            }
            return
        }

        if (node.child.left && !node.child.right) {
            if (parent === null) {
                this.root = node.child.left
                return
            }
            if (isLeftNode) {
                parent.child.left = node.child.left
            } else {
                parent.child.right = node.child.left
            }
            return
        }

        if (!node.child.left && node.child.right) {
            if (parent === null) {
                this.root = node.child.right
                return
            }
            if (isLeftNode) {
                parent.child.left = node.child.right
            } else {
                parent.child.right = node.child.right
            }
            return
        }

        let rightMin = node.child.right
        let rightMinParent = parent
        while (rightMin.child?.left != null) {
            rightMinParent = rightMin
            rightMin = rightMin.child.left
        }
        if (rightMinParent === parent) {
            node.child.right = null
            node.value = rightMin.value
        } else {
            node.value = rightMin.value
            rightMinParent.child.left = null
        }
    }

    findNode(value, node, parent, left) {
        if (!node) {
            return
        }
        if (value === node.value) {
            return { node, parent: parent || null, left: left == null ? null : left }
        }
        return node.value > value
            ? this.findNode(value, node.child.left, node, true)
            : this.findNode(value, node.child.right, node, false)
    }

    widthDetour(callback) {
        if (!this.root) {
            return
        }
        const stack = []
        stack.push(this.root)
        while (stack.length > 0) {
            const node = stack.shift()
            callback(node.value)
            if (node.child.right) stack.push(node.child.right)
            if (node.child.left) stack.push(node.child.left)
        }
    }

    deepDetour(callback) {
        if (!this.root) {
            return
        }
        const queue = []
        queue.push(this.root)
        while (queue.length > 0) {
            const node = queue.pop()
            callback(node.value)
            if (node.child.right) queue.push(node.child.right)
            if (node.child.left) queue.push(node.child.left)
        }
    }
}

module.exports = {
    BinaryTree,
}
