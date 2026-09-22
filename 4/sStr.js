function strikeStr(str) {
    let words = str.split(" ");
    let result = "";

    for (let i = 0; i < words.length; i++) {
        result += words[i] + " ";

        if ((i + 1) % 3 === 0) {
            result += "\n";
        }
    }

    return result;
}
console.log(strikeStr("Що я хотів розповісти на цю тему:"));
console.log(strikeStr("Всім привіт!"));
