function cheatHandler(){
    cheatEnabled = !cheatEnabled;
    if(cheatEnabled){
        updateCheat();
        updateCheatCurrentBox();
        showCheat();
    }
    else{
        hideCheat();
    }
}
function updateCheatCurrentBox(){
    const nextBox = playerSequence.length;
    const $sequence = document.querySelectorAll("#cheat-box");
    if(computerSequence.length == 0){return;}
    $sequence.forEach(element => {
        element.classList.remove("next");
    });
    if($sequence[nextBox] === undefined){return;}
    $sequence[nextBox].classList.add("next")
}
function showCheat(){
    document.querySelector("#cheat-code").classList.remove("oculto");
}
function hideCheat(){
    document.querySelector("#cheat-code").classList.add("oculto");
}
function updateCheat(){
    //first clean old cheatcode
    const $CheatCode = document.querySelector("#cheat-code");
    $CheatCode.innerHTML = "";
    computerSequence.forEach(element => {
        //create div for each step
        const $colorBox = document.createElement("div");
        $colorBox.setAttribute("id", "cheat-box");
        $colorBox.classList.add("col");
        $CheatCode.appendChild($colorBox);

        let color;
        let text;
        //set color
        switch (element) {
            case "rectangle1":
                text = 'Cuadro 1';
                color = 'rgb(243, 89, 192)';
                break;
            case "rectangle2":
                text = 'Cuadro 2';
                color = 'rgb(19, 89, 219)';
                break;
            case "rectangle3":
                text = 'Cuadro 3';
                color = 'rgb(86, 236, 86)';
                break;
            case "rectangle4":
                text = 'Cuadro 4';
                color = 'rgb(252, 172, 23)';
                break;
            default:
                text = "cuadro";
                color = "black";
                break;
        }
        $colorBox.textContent = text;
        $colorBox.style.color = color;
    });
}
