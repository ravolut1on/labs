function count(obj) {
    return Object.keys(obj).length;
}

let user = {
    name: "Kostya",
    age: 19,
};

console.log(count(user));