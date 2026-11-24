const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

rulesBtn.addEventListener("click", () => {
    rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
    rules.classList.remove("show");
});

// ****** CANVAS ******

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// ****** BALL ******

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 2,
    dx: 2,
    dy: -2
};


// ****** PADDLE ******

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 5,
    dx: 0
};


// ****** BRICKS ******

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};

// ****** GENERATE BRICKS ******

const brickRowCount = 9;
const brickColumnCount = 5;

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;

        bricks[i][j] = { x, y, ...brickInfo };
    }
}

// ****** SCORE ******

let score = 0;

// ****** GAME STATE ******

let gameState = "menu";

const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over-menu");

const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");

const finalScore = document.getElementById("final-score");

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#222";

    if (score >= 25) {
        ctx.fillText("ЗНУ найкращі!!!", canvas.width - 190, 30);
    } else {
        ctx.fillText(`Score: ${score}`, canvas.width - 120, 30);
    }
}


// ****** DRAW ******

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScore();
    drawBall();
    drawPaddle();
    drawBricks();
}

// ****** MOVE PADDLE ******

function movePaddle() {
    paddle.x += paddle.dx;

    // Правая граница
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    // Левая граница
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

// ****** START GAME ******

function startGame() {
    score = 0;

    ball.speed = 2;
    ball.dx = 2;
    ball.dy = -2;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    paddle.x = canvas.width / 2 - paddle.w / 2;
    paddle.dx = 0;

    showAllBricks();

    gameState = "playing";

    startMenu.classList.add("hidden");
    gameOverMenu.classList.add("hidden");
}

startBtn.addEventListener("click", startGame);

// ****** GAME OVER ******

function gameOver() {
    gameState = "gameover";

    paddle.dx = 0;

    finalScore.textContent = `Ваш рахунок: ${score}`;

    gameOverMenu.classList.remove("hidden");
}

retryBtn.addEventListener("click", startGame);

// ****** UPDATE ******

function update() {
    if (gameState === "playing") {
        movePaddle();
        moveBall();
    }

    draw();

    requestAnimationFrame(update);
}

update();

// ****** DRAW BALL ******

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();

    // ****** PADDLE COLLISION ******

if (
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.w &&
    ball.y + ball.size >= paddle.y &&
    ball.y - ball.size < paddle.y + paddle.h &&
    ball.dy > 0
) {
    ball.dy = -Math.abs(ball.dy);
}

// ****** BRICK COLLISION ******

bricks.forEach(column => {
    column.forEach(brick => {
        if (
            brick.visible &&
            ball.x + ball.size > brick.x &&
            ball.x - ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y &&
            ball.y - ball.size < brick.y + brick.h
        ) {
            ball.dy *= -1;
            brick.visible = false;
            score++;
        }
    });
});
}


// ****** DRAW PADDLE ******

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

// ****** DRAW BRICKS ******

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                ctx.beginPath();

                ctx.roundRect(
                    brick.x,
                    brick.y,
                    brick.w,
                    brick.h,
                    8
                );

                ctx.fillStyle = "#0095dd";
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}

// ****** KEYBOARD CONTROLS ******

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        paddle.dx = paddle.speed;
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e) {
    if (
        e.code === "ArrowRight" ||
        e.code === "ArrowLeft" ||
        e.code === "KeyA" ||
        e.code === "KeyD"
    ) {
        paddle.dx = 0;
    }
}

// ****** MOVE BALL ******
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}

function moveBall() {
    // Движение мяча
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Столкновение с правой и левой стенами
    if (
        ball.x + ball.size > canvas.width ||
        ball.x - ball.size < 0
    ) {
        ball.dx *= -1;
    }

    // Столкновение с верхней стеной
    if (ball.y - ball.size < 0) {
        ball.dy = Math.abs(ball.dy);
    }

    // Столкновение с платформой
    if (
        ball.x + ball.size > paddle.x &&
        ball.x - ball.size < paddle.x + paddle.w &&
        ball.y + ball.size >= paddle.y &&
        ball.y - ball.size < paddle.y + paddle.h &&
        ball.dy > 0
    ) {
        ball.dy = -Math.abs(ball.dy);
    }

    // Столкновение с блоками
    bricks.forEach(column => {
        column.forEach(brick => {
            if (
                brick.visible &&
                ball.x + ball.size > brick.x &&
                ball.x - ball.size < brick.x + brick.w &&
                ball.y + ball.size > brick.y &&
                ball.y - ball.size < brick.y + brick.h
            ) {
                ball.dy *= -1;
                brick.visible = false;
                    increaseScore();
            }
        });
    });

         // Проигрыш, если мяч упал вниз
        if (ball.y + ball.size >= canvas.height) {
         gameOver();
            return;
        }
}

function increaseScore() {
    score++;

    if (score % 10 === 0) {
        ball.speed++;
        ball.dx = Math.sign(ball.dx) * ball.speed;
        ball.dy = Math.sign(ball.dy) * ball.speed;
    }

    // Если уничтожены все 45 блоков
    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks();
    }
}