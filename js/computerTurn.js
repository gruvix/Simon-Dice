function startSequence(){
    
    computerSequence.push(randomColorBox());
    computerSequence.forEach((colorBox, index) => {
        const time = (index+0.5) * gameSpeedInMs;
        setTimeout(highLightColor, time, colorBox);
        setTimeout(handleSound, time+(0.5*gameSpeedInMs), colorBox);
    });
    const delay = (gameSpeedInMs * computerSequence.length + gameSpeedInMs).toFixed(1);
    setTimeout(roundHandler, delay,"player");
    reduceCounterBy100Ms((delay))
}

function blockInput(){
    document.querySelectorAll(".rectangle").forEach($rectangle => {
            $rectangle.onclick = function(){
                console.log("input bloqueado")
            }
    })
}

function randomColorBox(){
    const colorsAmount = document.querySelectorAll(".rectangle").length;
    const colorNumber = Math.floor(Math.random() * colorsAmount) + 1;
    return `rectangle${colorNumber}`;
}

function reduceCounterBy100Ms(ultimoValor){
    if(ultimoValor <= 0){
        return;
    }
    const valorActual = ultimoValor - 100;
    document.querySelector("#contador").textContent = (valorActual/1000).toFixed(1);
    setTimeout(reduceCounterBy100Ms, 100, valorActual);
}
