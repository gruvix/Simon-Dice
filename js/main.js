


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
}

function turnoJugador(){
    //turno del jugador
}

function randomCuadro(){
     return Math.floor(Math.random() * 4) + 1;
}