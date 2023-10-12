document.querySelector("#start").addEventListener("click", function(){
    tic = document.querySelector("#speed").value;
    disableStartButton();
    disableSpeedSettings();
    startGame("jugador")
});

document.querySelector("#cheat-button").addEventListener("click", function(){
    cheat();
});

let tic = 1000; //controla la velocidad del juego, siendo el tiempo en milisegundos
let round = 0;
let computerSequence = [];
let playerSequence = [];
let cheatEnabled = false;

function startGame(){
    hideGameOver();
    document.querySelectorAll(".cuadro").forEach(cuadro => {
        highLightColor(cuadro.id);
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
        }
    }else if(nextTurn === "end"){
        endGame()
    }
}
function endGame(){
    showGameOver();
    blockInput();
    setTimeout(restart, tic);
    setTimeout(enableStartButton, tic);
    setTimeout(enableSpeedSettings, tic);
}
/////////////////////////////////////////////////////TURNO COMPU////////////////////////////////////////
function startSequence(){
    
    computerSequence.push(randomColorBox());
    computerSequence.forEach((colorBox, index) => {
        const time = (index+0.5) * tic;
        setTimeout(highLightColor, time, colorBox);
    });
    const delay = (tic * computerSequence.length + 1*tic).toFixed(1);
    setTimeout(roundHandler, delay,"player");
    reduceCounterBy100Ms((delay))
}

function blockInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = function(){
                console.log("input bloqueado")
            }
    })
}

function randomColorBox(){
    return `cuadro${Math.floor(Math.random() * 4) + 1}`;
}

function reduceCounterBy100Ms(ultimoValor){
    if(ultimoValor <= 0){
        return;
    }
    const valorActual = ultimoValor - 100;
    document.querySelector("#contador").textContent = (valorActual/1000).toFixed(1);
    setTimeout(reduceCounterBy100Ms, 100, valorActual);
}
/////////////////////////////////////////////////////TURNO JUGADOR////////////////////////////////////////
function handleInput(event){
    const id = event.target.id;
    highLightColor(id);
    playerSequence.push(id);
    roundHandler(compareSequences(id));
}
function compareSequences(id){
    if(playerSequence[playerSequence.length-1] !== computerSequence[playerSequence.length-1]){
        highLightError(id);
        highLightCorrect(computerSequence[playerSequence.length-1]);
        return "end";
    }
    if(computerSequence.length === playerSequence.length){
        return "computer";
    }
}


function unlockInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = handleInput
    })
}

function highLightError(id){
    for(let index = 0; index < 7; index++){
        const $cuadro = document.getElementById(id);
        setTimeout(function() {
            $cuadro.classList.add("error");
        }, index*200);
        setTimeout(function() {
            $cuadro.classList.remove("error");
        }, index*200+100);
    }
}

function highLightCorrect(id){
    for(let index = 0; index < 7; index++){
        const $cuadro = document.getElementById(id);
        setTimeout(function() {
            $cuadro.classList.add("correct");
        }, index*200);
        setTimeout(function() {
            $cuadro.classList.remove("correct");
        }, index*200+100);
    }
}

function cheat(){
    cheatEnabled = !cheatEnabled;
    if(cheatEnabled){
        updateCheat();
        showCheat();
    }
    else{
        hideCheat();
    }
}

/////////////////////////////////////////////////////OTROS////////////////////////////////////////
function showCheat(){
    document.querySelector("#cheat-code").classList.remove("oculto");
}
function hideCheat(){
    document.querySelector("#cheat-code").classList.add("oculto");
}
function updateCheat(){
    const $CheatCode = document.querySelector("#cheat-code");
    $CheatCode.innerHTML = "";
    computerSequence.forEach(element => {
        const $cuadro = document.createElement("div");
        $cuadro.setAttribute("id", "cheat-box");
        $CheatCode.appendChild($cuadro);
        const $space = document.createElement("div");
        $space.innerHTML = '&nbsp;';
        $CheatCode.appendChild($space);
        let color = "black";
        let text = "cuadro";
        switch (element) {
            case "cuadro1":
                text = 'cuadro 1';
                color = 'rgb(243, 89, 192)';
                break;
            case "cuadro2":
                color = 'rgb(19, 89, 219)';
                text = 'cuadro 2';
                break;
            case "cuadro3":
                text = 'cuadro 3';
                color = 'rgb(86, 236, 86)';
                break;
            case "cuadro4":
                text = 'cuadro 4';
                color = 'rgb(252, 172, 23)';
                break;
            default:
                color = "black";
                break;
        }
        $cuadro.textContent = text;
        $cuadro.style.color = color;
    });
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
    document.getElementById("ronda").textContent = round;
}
function highLightColor(id){
    const $cuadro = document.getElementById(id);
    $cuadro.style.opacity = 1;
    setTimeout(() => {
        $cuadro.style.opacity = 0.6;
    }, tic*0.5);
}

