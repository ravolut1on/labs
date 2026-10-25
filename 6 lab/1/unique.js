function unique(arr) {
    let result = [];

    for (let item of arr) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }

    return result;
}

let arr = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Hare", ":-O"];

alert(unique(arr));