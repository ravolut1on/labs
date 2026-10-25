let btnincrease = document.querySelector(".increase");
let btndecrease = document.querySelector(".decrease");
let btnreset = document.querySelector(".reset");
let valueDisplay = document.getElementById("value");

let value = 0;

btnincrease.addEventListener("click", function () {
    value++;
    valueDisplay.textContent = value;

    if (value > 0) {
        valueDisplay.style.color = "green";
    } else if (value < 0) {
        valueDisplay.style.color = "red";
    } else {
        valueDisplay.style.color = "#222";
    }
});

btndecrease.addEventListener("click", function () {
    value--;
    valueDisplay.textContent = value;

    if (value > 0) {
        valueDisplay.style.color = "green";
    } else if (value < 0) {
        valueDisplay.style.color = "red";
    } else {
        valueDisplay.style.color = "#222";
    }
});

btnreset.addEventListener("click", function () {
    value = 0;
    valueDisplay.textContent = value;
    valueDisplay.style.color = "#222";
});