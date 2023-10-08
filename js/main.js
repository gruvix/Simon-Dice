

const tic = 1000; //controla la velocidad del juego, siendo el tiempo en milisegundos
let ronda = 0;
let secuenciaComputadora = [];

function comenzarJuego(){
    reiniciar();
    turnoCompu();
}

function reiniciar(){
    //reiniciar
}

function roundHandler(justPlayed){

    if(justPlayed === "jugador"){
        turnoCompu();
    }else{
        turnoJugador();
    }
}

function turnoCompu(){
    
    secuenciaComputadora.push(randomCuadro());
    secuenciaComputadora.forEach(color, index => {
        const tiempo = (index + 1) * tic;
        delayFunction(resaltarColor, tiempo, color);
    });

    roundHandler("computadora");
}

function turnoJugador(){
    //turno del jugador
    bloquearInput();
    roundHandler("jugador");
}

function bloquearInput(){

}

function actualizarRonda(){
    ronda ++;
    document.getElementById("ronda").textContent = ronda;
}

function delayFunction(delayedFunction, ms, parametro){
    setTimeout(delayedFunction(parametro), ms);
}

function resaltarColor(color){
    //resalta el cuadro xd
}

function randomCuadro(){
     return Math.floor(Math.random() * 4) + 1;
}