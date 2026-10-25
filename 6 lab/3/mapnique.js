function countOccurrences(arr) {
    let map = new Map();

    for (let number of arr) {
        if (map.has(number)) {
            map.set(number, map.get(number) + 1);
        } else {
            map.set(number, 1);
        }
    }

    return map;
}

let arr = [1, 2, 2, 3, 3, 3, 4];

console.log(countOccurrences(arr));