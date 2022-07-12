class Stack {
    constructor(array) {
        this.container = array || []
    }

    push(elem) {
        this.container = [...this.container, elem]
    }

    pop() {
        if (this.container.length > 0) {
            const result = this.container[this.container.length - 1]
            this.container = this.container.slice(0, -1)
            return result
        }
        return undefined
    }

    peek() {
        if (this.container.length > 0) {
            return this.container[this.container.length - 1]
        }
        return undefined
    }

    toArray() {
        return [...this.container]
    }
}

module.exports = {
    Stack,
}
