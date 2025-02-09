let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let winnergame = document.querySelector(".winner");
let win2 = document.querySelector(".win2");
let ng = document.querySelector(".ng");
let turnO = true;

const wins = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    [0, 5, 10, 15], [3, 6, 9, 12]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && box.innerText === "") {
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            setTimeout(computerMove, 500); // Add slight delay for realism
        }
    });
});

const computerMove = () => {
    if (checkWinner()) return;
    let chance = Math.random();
    let move = (chance < 0.7) ? findBestMove() : findRandomMove();
    if (move !== null) {
        boxes[move].innerText = "X";
        boxes[move].disabled = true;
        turnO = true;
        checkWinner();
    }
};

const findBestMove = () => {
    let potentialMoves = [];
    
    for (let pattern of wins) {
        let [a, b, c, d] = pattern;
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText, boxes[d].innerText];
        
        if (values.filter(v => v === "X").length === 3 && values.includes("")) {
            return pattern[values.indexOf("")]; // AI wins if possible
        }
        if (values.filter(v => v === "O").length === 3 && values.includes("")) {
            return pattern[values.indexOf("")]; // Block player win
        }
        
        if (values.filter(v => v === "X").length === 2 && values.includes("")) {
            potentialMoves.push(pattern[values.indexOf("")]); // Strategic move
        }
    }
    
    if (potentialMoves.length > 0) {
        return potentialMoves[Math.floor(Math.random() * potentialMoves.length)];
    }
    
    return findRandomMove(); // Default to random move if no strategic choice
};

const findRandomMove = () => {
    let availableBoxes = [...boxes].map((box, index) => box.innerText === "" ? index : null).filter(index => index !== null);
    return availableBoxes.length ? availableBoxes[Math.floor(Math.random() * availableBoxes.length)] : null;
};

const checkWin = () => {
    for (let pattern of wins) {
        let values = pattern.map(i => boxes[i].innerText);
        if (values.every(v => v === "X")) return "X";
        if (values.every(v => v === "O")) return "O";
    }
    return null;
};

const checkWinner = () => {
    let result = checkWin();
    if (result) {
        winnergame.innerHTML = result === "O" ? "You Win!" : "You Lose!";
        win2.classList.remove("hide");
        boxes.forEach(box => box.disabled = true);
        return true;
    }
    if ([...boxes].every(box => box.innerText !== "")) {
        winnergame.innerHTML = "It's a Tie!";
        win2.classList.remove("hide");
        return true;
    }
    return false;
};

const refresh = () => location.reload();
ng.addEventListener("click", refresh);
reset.addEventListener("click", refresh);
