const switchModeBtn = document.getElementById("switchModeBtn");
const calcMode = document.getElementById("calcMode");
const mainWrapper = document.getElementsByClassName("main-wrapper")[0];
const calcAnswer = document.getElementById("calcAnswer");

switchModeBtn.addEventListener("click", switchMode);

let mode = "NORMAL";

function switchMode() {
    mainWrapper.classList.toggle("gaming-mode");
    if (mainWrapper.classList[2] == "gaming-mode"){
        mode = "GAMING"
        calcMode.textContent = mode;
    } else {
        mode = "NORMAL"
        calcMode.textContent = mode;
    };
};