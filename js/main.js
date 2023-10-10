document.querySelector("#start").addEventListener("click", function(){
    document.querySelector("#start").classList.add("oculto");
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
    roundHandler("computadora");
}

function reiniciar(){
    actualizarRonda(-ronda);
    secuenciaComputadora = [];
    secuenciaJugador = [];
}
/////////////////////////////////////////////////////ROUND HANDLER////////////////////////////////////////

function roundHandler(nextTurn){
    if(nextTurn === "computadora"){
        actualizarRonda(1);
        bloquearInput();
        crearSecuencia();
    }else if(nextTurn === "jugador"){
        secuenciaJugador = [];
        desbloquearInput();
    }else if(nextTurn === "death"){
        terminarJuego()
    }
}
function terminarJuego(){
    mostrarGameOver();
    bloquearInput();
    setTimeout(reiniciar, tic);
    mostrarBotonInicio();
}
/////////////////////////////////////////////////////TURNO COMPU////////////////////////////////////////
function crearSecuencia(){
    
    secuenciaComputadora.push(randomCuadro());
    console.log(secuenciaComputadora);
    
    secuenciaComputadora.forEach((cuadro, index) => {
        const tiempo = (index + 1) * tic;
        console.log(tiempo);
        setTimeout(resaltarColor, tiempo, cuadro);
    });
    const delay = tic * secuenciaComputadora.length + 1000;
    setTimeout(roundHandler, delay,"jugador");
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


/////////////////////////////////////////////////////TURNO JUGADOR////////////////////////////////////////

function manejarInput(event){
    resaltarColor(event.target.id);
    secuenciaJugador.push(event.target.id);
    if(secuenciaJugador[secuenciaJugador.length-1] !== secuenciaComputadora[secuenciaJugador.length-1]){
        resaltarError(event.target.id);
        roundHandler("death")
        return;
    }
    if(secuenciaComputadora.length === secuenciaJugador.length){
        console.log("Ganaste la ronda!")
        setTimeout(roundHandler, tic, "computadora");
    }
}

function desbloquearInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = manejarInput
    })
}

function resaltarError(id){
    let borde = document.getElementById(id).style.inset;
      borde = "0 0 0 1px red"
    setTimeout(function() {
        borde = "";
    }, 1000);
}

/////////////////////////////////////////////////////OTROS////////////////////////////////////////
function mostrarGameOver(){
    document.querySelector("#game-over").classList.remove("oculto");
}
function ocultarGameOver(){
    document.querySelector("#game-over").classList.add("oculto");
}
function mostrarBotonInicio(){
    document.querySelector("#start").classList.remove("oculto");
}
function ocultarBotonInicio(){
    document.querySelector("#start").classList.add("oculto");
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

