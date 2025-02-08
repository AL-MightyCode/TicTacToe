let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let winnergame = document.querySelector(".winner");
let win2 = document.querySelector(".win2");
let ng = document.querySelector(".ng");
let turnO = true; // Player's turn
let gameOver = false; // Track if game is over

const wins = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && !gameOver) {
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            if (checkWinner()) return; // Stop game if someone won
            setTimeout(computerMove, 500); // Computer move after delay
        }
    });
});

const computerMove = () => {
    if (gameOver) return; // Stop if game is already over

    let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (availableBoxes.length > 0) {
        let bestMove = (Math.random() * 100 < 80) ? findBestMove() : findRandomMove();
        boxes[bestMove].innerText = "X";
        boxes[bestMove].disabled = true;
        turnO = true;
        checkWinner(); // Check if computer won
    }
};

const findBestMove = () => {
    for (let pattern of wins) {
        let [a, b, c] = pattern;
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        
        if (values.filter(v => v === "X").length === 2 && values.includes("")) {
            return pattern[values.indexOf("")];
        }
        if (values.filter(v => v === "O").length === 2 && values.includes("")) {
            return pattern[values.indexOf("")];
        }
    }
    return findRandomMove();
};

const findRandomMove = () => {
    let availableBoxes = Array.from(boxes).map((box, index) => box.innerText === "" ? index : null).filter(index => index !== null);
    return availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
};

const winnergame1 = (winner) => {
    gameOver = true; // Stop further moves
    winnergame.innerHTML = (winner === "O") ? "You Win!" : "You Lose!";
    win2.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of wins) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval1 === posval2 && posval2 === posval3) {
            winnergame1(posval1);
            boxes.forEach(box => box.disabled = true);
            return true; // Return true if there's a winner
        }
    }
    if ([...boxes].every(box => box.innerText !== "")) {
        winnergame.innerHTML = "It's a Tie!";
        win2.classList.remove("hide");
        gameOver = true;
        return true;
    }
    return false; // No winner yet
};

const refresh = () => location.reload();
ng.addEventListener("click", refresh);
reset.addEventListener("click", refresh);
