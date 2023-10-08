


let ronda = 0;
let secuenciaComputadora = [];

function comenzarJuego(){
    reiniciar();
    turnoCompu();
}

function reiniciar(){
    //reiniciar
}

function turnoCompu(){
    ronda ++;
    secuenciaComputadora.push(randomCuadro());
    secuenciaComputadora.forEach(color, index => {
        const tiempo = (index + 1) * 1000;
        delayFunction(resaltarColor, tiempo, color);
    });
}

function delayFunction(delayedFunction, ms, parametro){
    setTimeout(delayedFunction(parametro), ms);
}

function resaltarColor(color){
    //resalta el cuadro xd
}

function turnoJugador(){
    //turno del jugador
}

function randomCuadro(){
     return Math.floor(Math.random() * 4) + 1;
}