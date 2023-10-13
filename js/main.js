document.querySelector("#start").addEventListener("click", function(){
    disableStartButton();
    disableSpeedSettings();
    startGame("jugador")
});

document.querySelector("#cheat-button").addEventListener("click", function(){
    cheatHandler();
});

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
function roundHandler(nextTurn){
    const gameSpeedInMs = Number(document.querySelector("#speed").value);
    if(nextTurn === "computer"){
        updateTurnName("la computadora");
        updateRound(1);
        blockInput();
        setTimeout(startSequence, gameSpeedInMs);
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
    const gameSpeedInMs = Number(document.querySelector("#speed").value);
    showGameOver();
    blockInput();
    setTimeout(restart, gameSpeedInMs);
    setTimeout(enableStartButton, gameSpeedInMs);
    setTimeout(enableSpeedSettings, gameSpeedInMs);
}
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
function highLightColor(id){
    const gameSpeedInMs = Number(document.querySelector("#speed").value);
    const $rectangle = document.getElementById(id);
    $rectangle.style.opacity = 1;
    setTimeout(() => {
        $rectangle.style.opacity = 0.6;
    }, gameSpeedInMs*0.5);
}
