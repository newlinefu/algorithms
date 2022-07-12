class Node {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.lenght = 0
    }

    add(value, index) {
        if (!this.head) {
            this.head = new Node(value)
            this.tail = this.head
            this.lenght++
            return;
        }
        const newElement = new Node(value)
        if (index == null || index > this.lenght) {
            this.tail.next = newElement
            this.tail = newElement
            this.lenght++
        } else {
            for (
                let i = 0, actual = this.head;
                actual !== this.tail;
                actual = actual.next, i++
            ) {
                if (i === index - 1) {
                    const oldNext = actual.next
                    actual.next = newElement
                    newElement.next = oldNext
                    this.lenght++
                }
            }
        }
    }

    remove(index) {
        if (index == null) {
            return
        }

        if (!this.head) {
            return
        }

        if(!index) {
            this.head = this.head.next;
        }

        for (
            let i = 0, actual = this.head;
            actual != null;
            actual = actual.next, i++
        ) {
            if (i === index - 1) {
                actual.next = actual.next?.next || null
                return;
            }
        }
    }

    indexOf(value) {
        if (this.tail.value === value) {
            return this.lenght - 1
        }
        for (
            let i = 0, actual = this.head;
            actual != null;
            actual = actual.next, i++
        ) {
            if (actual.value === value) {
                return i
            }
        }
        return -1
    }

    toArray() {
        const result = []
        if (!this.head) {
            return result
        }
        for (
            let actual = this.head;
            actual != null;
            actual = actual.next
        ) {
            result.push(actual.value)
        }
        return result
    }

    getLength() {
        return this.lenght
    }
}

module.exports = {
    LinkedList,
}
