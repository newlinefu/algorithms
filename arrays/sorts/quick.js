const partition = (array, swap, compare, left, right) => {
    const prop = array[right]
    let lessIndex = left

    for (let i = left; i < right; i++) {
        if (compare(prop, array[i]) >= 0) {
            swap(array, lessIndex, i)
            lessIndex++
        }
    }
    swap(array, right, lessIndex)
    return lessIndex
}

const quickSortRecursivePart = (array, swap, compare, left, right) => {
    if (left > right) {
        return
    }
    const middle = partition(array, swap, compare, left, right)
    quickSortRecursivePart(array, swap, compare, left, middle - 1)
    quickSortRecursivePart(array, swap, compare, middle + 1, right)
}

const quickSort = (array, compare, swap) => {
    if (!Array.isArray(array)) {
        return array
    }
    quickSortRecursivePart(array, swap, compare, 0, array.length - 1)
}

module.exports = {
    quickSort,
}
