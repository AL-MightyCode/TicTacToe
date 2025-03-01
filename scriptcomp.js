let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let winnergame = document.querySelector(".winner");
let win2 = document.querySelector(".win2");
let ng = document.querySelector(".ng");
let turnO = true; // Player's turn

const wins = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            if (!winner()) {
                setTimeout(computerMove, 300); // Faster response
            }
        }
    });
});

const computerMove = () => {
    let chance = Math.random();
    let bestMove = (chance < 0.85) ? findBestMove() : findRandomMove(); // Allow some user wins
    boxes[bestMove].innerText = "X";
    boxes[bestMove].disabled = true;
    turnO = true;
    winner();
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
    
    if (boxes[4].innerText === "") return 4; // Prioritize center
    
    let corners = [0, 2, 6, 8].filter(i => boxes[i].innerText === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    
    let edges = [1, 3, 5, 7].filter(i => boxes[i].innerText === "");
    return edges[Math.floor(Math.random() * edges.length)];
};

const findRandomMove = () => {
    let availableBoxes = Array.from(boxes).map((box, index) => box.innerText === "" ? index : null).filter(index => index !== null);
    return availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
};

const winnergame1 = (posval1) => {
    if (posval1 === "O") {
        winnergame.innerHTML = "You Win!";
    } else if (posval1 === "X") {
        winnergame.innerHTML = "You Lose!";
    }
    win2.classList.remove("hide");
};

const winner = () => {
    for (let pattern of wins) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval1 === posval2 && posval2 === posval3) {
            winnergame1(posval1);
            boxes.forEach(box => box.disabled = true);
            return true;
        }
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
