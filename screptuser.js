let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let winnergame=document.querySelector(".winner");
let win2 = document.querySelector(".win2");
let ng = document.querySelector(".ng");
let turnO=true;


const wins=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        
         winner();
    });
});

const winnergame1=(posval1)=>{
    winnergame.innerHTML=`Winner is ${posval1}`
    win2.classList.remove("hide");
}

const winner = ()=>{
    for(let pattern of wins){
        
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !="" && posval2!="" && posval3!=""){
            if(posval1===posval2 && posval2===posval3){
                winnergame1(posval1);
                for(let box of boxes){
                    box.disabled=true;
                }
            }
            else{

            }
        }
        
    }
    if ([...boxes].every(box => box.innerText !== "")) {
        winnergame.innerHTML = "It's a Tie!";
        win2.classList.remove("hide");
    }

}
const refresh = ()=>{
    location.reload()
}
ng.addEventListener("click",refresh);
reset.addEventListener("click",refresh);




