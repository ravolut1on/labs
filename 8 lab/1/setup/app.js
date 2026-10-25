const colors = ["randomColor"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let randomColor = `rgb(${r}, ${g}, ${b})`;

    document.body.style.backgroundColor = randomColor;
    color.style.color = randomColor;
document.querySelector(".color").textContent = randomColor;
});