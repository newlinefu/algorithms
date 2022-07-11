const bubbleSort = (array, compare, swap) => {
    if (!Array.isArray(array)) {
        return array
    }
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (compare(array[j], array[j + 1]) > 0) {
                swap(array, j, j + 1)
            }
        }
    }

    return array
}

module.exports = {
    bubbleSort,
}
