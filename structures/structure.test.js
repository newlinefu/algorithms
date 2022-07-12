const { Stack } = require('./stack')
const { LinkedList } = require('./linked-list')

// ---- STACK ---- //
test('Initializing stack', () => {
    const array = [1, 2, 3, 4]
    const normal = new Stack(array)
    const empty = new Stack(null)

    expect(normal.toArray()).toEqual(array)
    expect(empty.toArray()).toEqual([])
})

test('Push stack', () => {
    const array = [1, 2, 3, 4]
    const stack = new Stack(array)
    stack.push(-1)

    expect(stack.toArray()).toEqual([...array, -1])
})

test('Pop stack', () => {
    const array = [1, 2, 3, 4]
    const stack = new Stack(array)
    const elem = stack.pop()

    expect(stack.toArray()).toEqual([1, 2, 3])
    expect(elem).toEqual(4)
})

test('Peek stack', () => {
    const array = [1, 2, 3, 4]
    const stack = new Stack(array)
    const elem = stack.peek()

    expect(stack.toArray()).toEqual(array)
    expect(elem).toEqual(4)
})

// ---- LINKED LIST ---- //

test('Initializing list', () => {
    const expected = [];
    const list = new LinkedList();
    expect(list.toArray()).toEqual(expected)
})

test('Add list test', () => {
    const expected = [1,3,2];
    const list = new LinkedList();
    list.add(1)
    list.add(2)
    list.add(3,1)
    expect(list.toArray()).toEqual(expected)
})

test('Remove list test', () => {
    const expected = [1,2];
    const list = new LinkedList();
    list.add(1)
    list.add(2)
    list.add(3,1)
    list.remove(1)
    expect(list.toArray()).toEqual(expected)
    list.remove(0)
    expect(list.toArray()).toEqual([2])
    list.remove(0)
    expect(list.toArray()).toEqual([])
})

test('IndexOf list test', () => {
    const list = new LinkedList();
    list.add(1)
    list.add(2)
    list.add(3)

    const first = list.indexOf(1)
    const second = list.indexOf(2)
    const last = list.indexOf(3)
    const notExisted = list.indexOf(100)

    expect(first).toEqual(0)
    expect(second).toEqual(1)
    expect(last).toEqual(2)
    expect(notExisted).toEqual(-1)
})
