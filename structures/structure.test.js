const { Stack } = require('./stack')
const { LinkedList } = require('./linked-list')
const { BinaryTree } = require('./binary-tree')

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
    const expected = []
    const list = new LinkedList()
    expect(list.toArray()).toEqual(expected)
})

test('Add list test', () => {
    const expected = [1, 3, 2]
    const list = new LinkedList()
    list.add(1)
    list.add(2)
    list.add(3, 1)
    expect(list.toArray()).toEqual(expected)
})

test('Remove list test', () => {
    const expected = [1, 2]
    const list = new LinkedList()
    list.add(1)
    list.add(2)
    list.add(3, 1)
    list.remove(1)
    expect(list.toArray()).toEqual(expected)
    list.remove(0)
    expect(list.toArray()).toEqual([2])
    list.remove(0)
    expect(list.toArray()).toEqual([])
})

test('IndexOf list test', () => {
    const list = new LinkedList()
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

// ---- TREE ---- //

test('Tree addition test (full right)', () => {
    const tree = new BinaryTree()
    // (1)
    //      (2)
    //          (3)
    tree.add(1)
    tree.add(2)
    tree.add(3)
    const array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([1,2,3])
})

test('Tree addition test (full left)', () => {
    //          (3)
    //      (2)
    // (1)
    const tree = new BinaryTree()
    tree.add(3)
    tree.add(2)
    tree.add(1)
    const array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([3,2,1])
})

test('Tree addition test (balanced)', () => {
    //          (10)
    //      (2)     (13)
    // (1)    (4)  (11)     (20)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(13)
    tree.add(2)
    tree.add(11)
    tree.add(20)
    tree.add(4)
    tree.add(1)
    const array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 13, 2, 20, 11, 4, 1])
})

test('Tree removing head test', () => {
    //      (10)
    const tree = new BinaryTree()
    tree.add(10)
    tree.remove(10)
    const array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([])
})

test('Tree removing without child test', () => {
    //      (10)
    // (9)      (13)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(13)
    tree.add(9)
    tree.remove(9)
    const array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 13])
})

test('Tree removing with left child test', () => {
    //      (10)
    //    (3)   (20)
    // (1)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(3)
    tree.add(20)
    tree.add(1)
    let array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 20, 3, 1])
    tree.remove(3)
    array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 20, 1])
})

test('Tree removing with right child test', () => {
    //      (10)
    //    (3)   (20)
    //              (30)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(3)
    tree.add(20)
    tree.add(30)
    let array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 20, 3, 30])
    tree.remove(20)
    array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 30, 3])
})

test('Tree removing with both of child test (right child is simple)', () => {
    //      (10)
    //    (3)   (20)
    //        (15)  (30)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(3)
    tree.add(20)
    tree.add(30)
    tree.add(15)
    let array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 20, 3, 30, 15])
    tree.remove(20)
    array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 30, 3, 15])
})

test('Tree removing with both of child test (right child has child)', () => {
    //      (10)
    //    (3)      (20)
    //        (15)      (30)
    //      (13) (18)  (23) (32)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(3)
    tree.add(20)
    tree.add(30)
    tree.add(15)
    tree.add(13)
    tree.add(18)
    tree.add(23)
    tree.add(32)
    let array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 20, 3, 30, 15, 32, 23, 18, 13])
    tree.remove(20)
    //      (10)
    //  (3)        (23)
    //        (15)      (30)
    //     (13) (18)        (32)
    array = [];
    tree.widthDetour((value) => array.push(value))
    expect(array).toEqual([10, 23, 3, 30, 15, 32, 18, 13])
})

test('Tree deep detour test', () => {
    //      (10)
    //    (3)      (20)
    //        (15)      (30)
    //      (13) (18)  (23) (32)
    const tree = new BinaryTree()
    tree.add(10)
    tree.add(3)
    tree.add(20)
    tree.add(30)
    tree.add(15)
    tree.add(13)
    tree.add(18)
    tree.add(23)
    tree.add(32)
    const array = [];
    tree.deepDetour((value) => array.push(value))
    expect(array).toEqual([10, 3, 20, 15, 13, 18, 30, 23, 32])
})
