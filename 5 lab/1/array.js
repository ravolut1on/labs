let styles = ["Jazz", "Blues"];

styles.push("Rock-n-Roll");

let middleIndex = Math.floor(styles.length / 2);
styles[middleIndex] = "Classics";

let firstElement = styles.shift();
alert(firstElement);

styles.unshift("Rap", "Reggae");

console.log(styles);