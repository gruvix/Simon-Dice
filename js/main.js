document.querySelector("#start").addEventListener("click", function(){
    tic = document.querySelector("#speed").value;
    disableStartButton();
    disableSpeedSettings();
    startGame("jugador")
});

document.querySelector("#cheat-button").addEventListener("click", function(){
    cheatHandler();
});

let tic = 1000; //controls general game speed, in miliseconds
let round = 0;
let computerSequence = [];
let playerSequence = [];
let cheatEnabled = false;
const soundError = new Audio("sounds/error.mp3");

function startGame(){
    hideGameOver();
    document.querySelectorAll(".rectangle").forEach($rectangle => {
        highLightColor($rectangle.id);
    });
    roundHandler("computer");
}

function restart(){
    updateRound(-round);
    computerSequence = [];
    playerSequence = [];
}
/////////////////////////////////////////////////////ROUND HANDLER////////////////////////////////////////

function roundHandler(nextTurn){
    if(nextTurn === "computer"){
        updateTurnName("la computadora");
        updateRound(1);
        blockInput();
        setTimeout(startSequence, tic);
    }else if(nextTurn === "player"){
        playerSequence = [];
        unlockInput();
        updateTurnName("el jugador");
        if(cheatEnabled){
            updateCheat();
            updateCheatCurrentBox();
        }
    }else if(nextTurn === "end"){
        endGame()
    }else if(cheatEnabled){
        updateCheatCurrentBox();
    }
}
function endGame(){
    showGameOver();
    blockInput();
    setTimeout(restart, tic);
    setTimeout(enableStartButton, tic);
    setTimeout(enableSpeedSettings, tic);
}
/////////////////////////////////////////////////////COMPUTER TURN////////////////////////////////////////
/////////////////////////////////////////////////////PLAYER TURN////////////////////////////////////////
/////////////////////////////////////////////////////OTHER////////////////////////////////////////
function handleSound(id){
    if(!id) {
        soundError.play();
        return;
    }
    document.getElementById(id).firstChild.play();
}
function updateTurnName(turnName){
    const $turn = document.querySelector("#turn");
    $turn.textContent = turnName;
    if(turnName === "el jugador"){
        $turn.classList.add("player");
        $turn.classList.remove("computer");
    }else{
        $turn.classList.add("computer");
        $turn.classList.remove("player");
    }
}
function showGameOver(){
    document.querySelector("#game-over").classList.remove("oculto");
}
function hideGameOver(){
    document.querySelector("#game-over").classList.add("oculto");
}
function enableSpeedSettings(){
    document.querySelector("#speed").removeAttribute("disabled");
}
function disableSpeedSettings(){
    document.querySelector("#speed").setAttribute("disabled", "disabled");
}
function enableStartButton(){
    document.querySelector("#start").removeAttribute("disabled");
}
function disableStartButton(){
    document.querySelector("#start").setAttribute("disabled", "disabled");
}
function updateRound(x){
    round += x;
    document.getElementById("round").innerText = round;
}
//different to highlight correct and wrong box, this simply enlightens a color box
function highLightColor(id){
    const $rectangle = document.getElementById(id);
    $rectangle.style.opacity = 1;
    setTimeout(() => {
        $rectangle.style.opacity = 0.6;
    }, tic*0.5);
}
///////////////////////////////////////////////////////CHEAT////////////////////////////////////////
function cheatHandler(){
    cheatEnabled = !cheatEnabled;
    if(cheatEnabled){
        updateCheat();
        updateCheatCurrentBox();
        showCheat();
    }
    else{
        hideCheat();
    }
}
function updateCheatCurrentBox(){
    const nextBox = playerSequence.length;
    const $sequence = document.querySelectorAll("#cheat-box");
    if(computerSequence.length == 0){return;}
    $sequence.forEach(element => {
        element.classList.remove("next");
    });
    if($sequence[nextBox] === undefined){return;}
    $sequence[nextBox].classList.add("next")
}
function showCheat(){
    document.querySelector("#cheat-code").classList.remove("oculto");
}
function hideCheat(){
    document.querySelector("#cheat-code").classList.add("oculto");
}
function updateCheat(){
    //first clean old cheatcode
    const $CheatCode = document.querySelector("#cheat-code");
    $CheatCode.innerHTML = "";
    computerSequence.forEach(element => {
        //create div for each step
        const $colorBox = document.createElement("div");
        $colorBox.setAttribute("id", "cheat-box");
        $colorBox.classList.add("col");
        $CheatCode.appendChild($colorBox);

        let color;
        let text;
        //set color
        switch (element) {
            case "rectangle1":
                text = 'Cuadro 1';
                color = 'rgb(243, 89, 192)';
                break;
            case "rectangle2":
                text = 'Cuadro 2';
                color = 'rgb(19, 89, 219)';
                break;
            case "rectangle3":
                text = 'Cuadro 3';
                color = 'rgb(86, 236, 86)';
                break;
            case "rectangle4":
                text = 'Cuadro 4';
                color = 'rgb(252, 172, 23)';
                break;
            default:
                text = "cuadro";
                color = "black";
                break;
        }
        $colorBox.textContent = text;
        $colorBox.style.color = color;
    });
}
