const insertionSort = (array, compare, swap) => {
    if (!Array.isArray(array)) {
        return array
    }
    for (let i = 1; i < array.length; i++) {
        for (
            let j = i - 1;
            j >= 0 && compare(array[j], array[j + 1]) > 0;
            j--
        ) {
            swap(array, j, j + 1)
        }
    }
    return array
}

module.exports = {
    insertionSort,
}
