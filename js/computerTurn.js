function startSequence(){
    const gameSpeedInMs = Number(document.querySelector("#speed").value);
    computerSequence.push(randomColorBox());
    computerSequence.forEach((colorBox, index) => {
        const time = (index) * gameSpeedInMs;
        setTimeout(highLightColor, time, colorBox);
        setTimeout(handleSound, time, colorBox);
    });
    const delay = (gameSpeedInMs * computerSequence.length).toFixed(1);
    setTimeout(roundHandler, delay,"player");
    reduceCounter((delay))
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

function reduceCounter(lastValue){
    const reduction = 100;
    if(lastValue <= 0){
        return;
    }
    const currentValue = lastValue - reduction;
    document.querySelector("#counter").textContent = (currentValue/1000).toFixed(1);
    setTimeout(reduceCounter, 100, currentValue);
}
