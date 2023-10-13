function handleInput(event){
    const id = event.target.id;
    highLightColor(id);
    playerSequence.push(id);
    roundHandler(compareSequences(id));
    handleSound(id);
}
function compareSequences(id){
    if(playerSequence[playerSequence.length-1] !== computerSequence[playerSequence.length-1]){
        highLightError(id);
        highLightCorrect(computerSequence[playerSequence.length-1]);
        handleSound();
        return "end";
    }
    if(computerSequence.length === playerSequence.length){
        if(cheatEnabled){
            updateCheatCurrentBox();
        }
        return "computer";
    }
}
function unlockInput(){
    document.querySelectorAll(".rectangle").forEach($rectangle => {
            $rectangle.onclick = handleInput
    })
}
function highLightError(id){
    for(let index = 0; index < 7; index++){
        const $rectangle = document.getElementById(id);
        setTimeout(function() {
            $rectangle.classList.add("error");
        }, index*200);
        setTimeout(function() {
            $rectangle.classList.remove("error");
        }, index*200+100);
    }
}
function highLightCorrect(id){
    for(let index = 0; index < 7; index++){
        const $rectangle = document.getElementById(id);
        setTimeout(function() {
            $rectangle.classList.add("correct");
        }, index*200);
        setTimeout(function() {
            $rectangle.classList.remove("correct");
        }, index*200+100);
    }
}
