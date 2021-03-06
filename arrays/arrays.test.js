const { bubbleSort } = require('./sorts/bubble')
const { insertionSort } = require('./sorts/insertion')
const { choiceSort } = require('./sorts/choice')
const { quickSort } = require('./sorts/quick')
const { data, result } = require('./data.json')

test('Bubble test', () => {
    data.forEach((array, index) => {
        const expectedArray = result[index]
        const sortedArray = bubbleSort(
            array,
            index === 0 ? (a, b) => b - a : (a, b) => a - b,
            (array, index1, index2) => {
                const dump = array[index1]
                array[index1] = array[index2]
                array[index2] = dump
            }
        )
        expect(sortedArray).toEqual(expectedArray)
    })
})

test('Insertion test', () => {
    data.forEach((array, index) => {
        const expectedArray = result[index]
        const sortedArray = insertionSort(
            array,
            index === 0 ? (a, b) => b - a : (a, b) => a - b,
            (array, index1, index2) => {
                const dump = array[index1]
                array[index1] = array[index2]
                array[index2] = dump
            }
        )
        expect(sortedArray).toEqual(expectedArray)
    })
})

test('Choice test', () => {
    data.forEach((array, index) => {
        const expectedArray = result[index]
        const sortedArray = choiceSort(
            array,
            (array, index1, index2) => {
                const dump = array[index1]
                array[index1] = array[index2]
                array[index2] = dump
            },
            index !== 0
        )
        expect(sortedArray).toEqual(expectedArray)
    })
})

test('Quick test', () => {
    data.forEach((array, index) => {
        const expectedArray = result[index]
        quickSort(
            array,
            index === 0 ? (a, b) => b - a : (a, b) => a - b,
            (array, index1, index2) => {
                const dump = array[index1]
                array[index1] = array[index2]
                array[index2] = dump
            }
        )
        expect(array).toEqual(expectedArray)
    })
})
