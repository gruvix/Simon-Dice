document.querySelector("#start").addEventListener("click", function(){
    comenzarJuego("jugador")
});

const tic = 1000; //controla la velocidad del juego, siendo el tiempo en milisegundos
let ronda = 0;
let secuenciaComputadora = [];
let secuenciaJugador = [];

function comenzarJuego(){
    reiniciar();

    document.querySelectorAll(".cuadro").forEach(cuadro => {
        resaltarColor(cuadro.id);
    });
    const esperaMs = 5*tic;
    delayFunction(roundHandler, esperaMs, "jugador");
}

function reiniciar(){
    secuenciaComputadora = [];
    secuenciaJugador = [];
}

function roundHandler(justPlayed){
    actualizarRonda();
    secuenciaJugador = [];
    if(justPlayed === "jugador"){
        bloquearInput();
        turnoCompu();
    }else{
        desbloquearInput();
    }
}

function turnoCompu(){
    
    secuenciaComputadora.push(randomCuadro());
    secuenciaComputadora.forEach((cuadro, index) => {
        const tiempo = (index + 1) * tic;
        delayFunction(resaltarColor, tiempo, cuadro);
    });
    const delay = tic * secuenciaComputadora.length + 1000;
    delayFunction(roundHandler, delay, "computadora");
}

function bloquearInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = function(){
                console.log("input bloqueado")
            }
    })
}

function desbloquearInput(){
    document.querySelectorAll(".cuadro").forEach($cuadro => {
            $cuadro.onclick = manejarInput
    })
}

function manejarInput(event){
    resaltarColor(event.target.id);
    secuenciaJugador.push(event.target.id);
    if(secuenciaJugador[secuenciaJugador.length-1] === secuenciaComputadora[secuenciaJugador.length-1]){
        setTimeout(() => {
            console.log("Ganaste la ronda!")
            setTimeout(roundHandler("jugador"), tic);
        }, tic);
    }
}

function actualizarRonda(){
    ronda += 0.5;
    document.getElementById("ronda").textContent = ronda;
}

function delayFunction(delayedFunction, ms, parametro){
    setTimeout(delayedFunction(parametro), ms);
}

function resaltarColor(id){
    const $cuadro = document.getElementById(id);
    $cuadro.style.opacity = 1;
    setTimeout(() => {
        $cuadro.style.opacity = 0.6;
    }, tic*0.5);
}

function randomCuadro(){
     return `cuadro${Math.floor(Math.random() * 4) + 1}`;
}