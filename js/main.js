

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
        bloquearInput();
        turnoCompu();
    }else{
        desbloquearInput();
    }
}

function turnoCompu(){
    
    secuenciaComputadora.push(randomCuadro());
    secuenciaComputadora.forEach(color, index => {
        const tiempo = (index + 1) * tic;
        delayFunction(resaltarColor, tiempo, color);
    });

    delayFunction(roundHandler, tic * secuenciaComputadora.length, "computadora");
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
    console.log(event.target);
    resaltarColor(event.target.id);
}

function actualizarRonda(){
    ronda ++;
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
    }, 500)
}

function randomCuadro(){
     return Math.floor(Math.random() * 4) + 1;
}