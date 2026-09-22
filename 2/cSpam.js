function checkSpam(str) {
    let message = str.toLowerCase();

    return message.includes("росі") || message.includes("xxx");
}

console.log(checkSpam("росія повинна горіти"));
console.log(checkSpam("XXX XXXXXX ssssss"));
console.log(checkSpam("innocent rabbit"));