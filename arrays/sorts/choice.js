const findElementIndex = (array, startIndex, findMin = true) => {
    let foundedElement = array[startIndex];
    let foundedIndex = startIndex;
    let mathCallback = findMin ? Math.min : Math.max;
    for(let i = startIndex; i < array.length; i++) {
        foundedElement = mathCallback(foundedElement, array[i])
        if(foundedElement === array[i]) {
            foundedIndex = i;
        }
    }
    return foundedIndex;
}


const choiceSort = (array, swap, asc = true) => {
    if (!Array.isArray(array)) {
        return array
    }
    for (let i = 0; i < array.length; i++) {
        const targetIndex = findElementIndex(array, i, asc)
        swap(array, targetIndex, i)
    }
    return array
}

module.exports = {
    choiceSort,
}
