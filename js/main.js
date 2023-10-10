document.querySelector("#start").addEventListener("click", function(){
    ocultarBotonInicio();
    comenzarJuego("jugador")
});

const tic = 1000; //controla la velocidad del juego, siendo el tiempo en milisegundos
let ronda = 0;
let secuenciaComputadora = [];
let secuenciaJugador = [];

function comenzarJuego(){
    ocultarGameOver();
    document.querySelectorAll(".cuadro").forEach(cuadro => {
        resaltarColor(cuadro.id);
    });
    roundHandler("computer");
}

function reiniciar(){
    actualizarRonda(-ronda);
    secuenciaComputadora = [];
    secuenciaJugador = [];
}
/////////////////////////////////////////////////////ROUND HANDLER////////////////////////////////////////

function roundHandler(nextTurn){
    if(nextTurn === "computer"){
        actualizarRonda(1);
        bloquearInput();
        crearSecuencia();
    }else if(nextTurn === "player"){
        secuenciaJugador = [];
        desbloquearInput();
    }else if(nextTurn === "end"){
        terminarJuego()
    }
}
function terminarJuego(){
    mostrarGameOver();
    bloquearInput();
    setTimeout(reiniciar, tic);
    setTimeout(mostrarBotonInicio, tic);
}
/////////////////////////////////////////////////////TURNO COMPU////////////////////////////////////////
function crearSecuencia(){
    
    secuenciaComputadora.push(randomCuadro());
    secuenciaComputadora.forEach((cuadro, index) => {
        const tiempo = (index + 1) * tic;
        setTimeout(resaltarColor, tiempo, cuadro);
    });
    const delay = (tic * secuenciaComputadora.length + 0.5*tic).toFixed(1);
    setTimeout(roundHandler, delay,"player");
    reducirContadorCada100Ms((delay/1000)+0.1)
}

function bloquearInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = function(){
                console.log("input bloqueado")
            }
    })
}

function randomCuadro(){
    return `cuadro${Math.floor(Math.random() * 4) + 1}`;
}

function reducirContadorCada100Ms(ultimoValor){
    if(ultimoValor <= 0){
        return;
    }
    const valorActual = (ultimoValor - 0.1).toFixed(1);
    document.querySelector("#contador").textContent = valorActual;
    setTimeout(reducirContadorCada100Ms, 100, valorActual);
}


/////////////////////////////////////////////////////TURNO JUGADOR////////////////////////////////////////

function manejarInput(event){
    resaltarColor(event.target.id);
    secuenciaJugador.push(event.target.id);
    if(secuenciaJugador[secuenciaJugador.length-1] !== secuenciaComputadora[secuenciaJugador.length-1]){
        resaltarError(event.target.id);
        roundHandler("end")
        return;
    }
    if(secuenciaComputadora.length === secuenciaJugador.length){
        setTimeout(roundHandler, tic, "computer");
    }
}

function desbloquearInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = manejarInput
    })
}

function resaltarError(id){
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

/////////////////////////////////////////////////////OTROS////////////////////////////////////////
function mostrarGameOver(){
    document.querySelector("#game-over").classList.remove("oculto");
}
function ocultarGameOver(){
    document.querySelector("#game-over").classList.add("oculto");
}
function mostrarBotonInicio(){
    document.querySelector("#start").removeAttribute("disabled");

    //document.querySelector("#start").classList.remove("oculto");
}
function ocultarBotonInicio(){
    document.querySelector("#start").setAttribute("disabled", "disabled");

    //document.querySelector("#start").classList.add("oculto");
}
function actualizarRonda(x){
    ronda += x;
    document.getElementById("ronda").textContent = ronda;
}

function resaltarColor(id){
    const $cuadro = document.getElementById(id);
    $cuadro.style.opacity = 1;
    setTimeout(() => {
        $cuadro.style.opacity = 0.6;
    }, tic*0.5);
}

