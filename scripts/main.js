const switchModeBtn = document.getElementById("switchModeBtn");
const mainWrapper = document.getElementsByClassName("main-wrapper")[0];

// screen
const calcScreen = document.getElementById("calcScreen");
const calcMode = document.getElementById("calcMode");
const calcAnswer = document.getElementById("calcAnswer");
const calcExpression = document.getElementById("calcExpression");

// buttons
// top
const btnOff = document.getElementById("btnOff");
const btnOn = document.getElementById("btnOn");
const btnClear = document.getElementById("btnClear");
const btnDelete = document.getElementById("btnDelete");
const btnAbout = document.getElementById("btnAbout");

// Numbers
const btnZero = document.getElementById("btnZero");
const btnOne = document.getElementById("btnOne");
const btnTwo = document.getElementById("btnTwo");
const btnThree = document.getElementById("btnThree");
const btnFour = document.getElementById("btnFour");
const btnFive = document.getElementById("btnFive");
const btnSix = document.getElementById("btnSix");
const btnSeven = document.getElementById("btnSeven");
const btnEight = document.getElementById("btnEight");
const btnNine = document.getElementById("btnNine");
const btnDecimal = document.getElementById("btnDecimal");
const btnPi = document.getElementById("btnPi");
const btnExponent = document.getElementById("btnExponent");
const btnSqrt = document.getElementById("btnSqrt");
const btnOpenPar = document.getElementById("btnOpenPar");
const btnClosePar = document.getElementById("btnClosePar");
const btnMultiply = document.getElementById("btnMultiply");
const btnDivide = document.getElementById("btnDivide");
const btnAdd = document.getElementById("btnAdd");
const btnSubtract = document.getElementById("btnSubtract");
const btnEquals = document.getElementById("btnEquals");

// global variables
let mode = "NORMAL";
let calcStatus = "off"
let calcExpressionString = "";

// Events
// switch mode
switchModeBtn.addEventListener("click", switchMode);

// turn on
btnOn.addEventListener("click", function() {
    calcScreen.classList.add("turnOn");
    calcStatus = "on";
    clearScreen();
});

// turn off
btnOff.addEventListener("click", function() {
    calcScreen.classList.remove("turnOn");
    calcStatus = "off";
    clearScreen();
});

// clear screen
btnClear.addEventListener("click", function(){
    clearScreen()
});

// delete number
btnDelete.addEventListener("click", function(){
    if (calcExpressionString.length > 12){
        let calcExpLimit = calcExpressionString.slice(calcExpressionString.length - 12, -1);
        calcExpression.textContent = calcExpLimit;
    } else {
        calcExpressionString = calcExpressionString.slice(0, -1)
        calcExpression.textContent = calcExpressionString;
    };
});

// click numbers
btnZero.addEventListener("click", function(){printNum(0)});
btnOne.addEventListener("click", function(){printNum(1)});
btnTwo.addEventListener("click", function(){printNum(2)});
btnThree.addEventListener("click", function(){printNum(3)});
btnFour.addEventListener("click", function(){printNum(4)});
btnFive.addEventListener("click", function(){printNum(5)});
btnSix.addEventListener("click", function(){printNum(6)});
btnSeven.addEventListener("click", function(){printNum(7)});
btnEight.addEventListener("click", function(){printNum(8)});
btnNine.addEventListener("click", function(){printNum(9)});
btnDecimal.addEventListener("click", function(){printNum(".")});
btnPi.addEventListener("click", function(){printNum("π")});
btnExponent.addEventListener("click", function(){printNum("^")});
btnSqrt.addEventListener("click", function(){printNum("(√")});
btnOpenPar.addEventListener("click", function(){printNum("(")});
btnClosePar.addEventListener("click", function(){printNum(")")});
btnMultiply.addEventListener("click", function(){printNum("x")});
btnDivide.addEventListener("click", function(){printNum("/")});
btnAdd.addEventListener("click", function(){printNum("+")});
btnSubtract.addEventListener("click", function(){printNum("-")});
btnEquals.addEventListener("click", function(){solveExpression(calcExpressionString)});


// Functions
// switch mode
function switchMode() {
    mainWrapper.classList.toggle("gaming-mode");
    if (mainWrapper.classList[2] == "gaming-mode"){
        mode = "GAMING"
        calcMode.textContent = mode;
    } else {
        mode = "NORMAL"
        calcMode.textContent = mode;
    };
    clearScreen();
};

// clear screen 
function clearScreen(){
    calcExpressionString = "";
    calcExpression.textContent = "";
    calcAnswer.textContent = "";
}

// print numbers in calc expression
function printNum(value){
    if(calcStatus == "on") {
        calcExpressionString += `${value}`;
        calcExpression.textContent = calcExpressionString;
    };
    if (calcExpressionString.length > 12){
        let calcExpLimit = calcExpressionString.slice(calcExpressionString.length - 12);
        calcExpression.textContent = calcExpLimit;
    };
    calcAnswer.textContent = "";
}

// solve expression
function solveExpression(stringExpression){

    let validChars = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "π"];

    // convert string expression to array
    let expArray = stringExpression.split("");

    // allow multiplication using parenthesis, pi, and square root
    for (let i=0; i < expArray.length; i++){
        if(validChars.includes(expArray[i]) && (expArray[i+1] === "(" || expArray[i+1] === "π")){
            expArray[i] = expArray[i] + "*";
        };
        if((expArray[i] === ")" || expArray[i] === "π") && (validChars.includes(expArray[i+1]) || expArray[i+1] === "(")){
            expArray[i] = expArray[i] + "*";
        };
    }

    // revert array to string
    let expStringJoined = expArray.join("");

    // for square roots
    for (let i=0; i < expStringJoined.length; i++) {
        if (expStringJoined[i] == "√"){
            let radicandStringBefore = expStringJoined.split().pop().split('(√')[0];
            let radicandString = expStringJoined.split('(√').pop().split()[0];

            console.log(radicandStringBefore);
            console.log(radicandString);

            findRadicand(radicandString);
        }
    }
    // let radicand = expStringJoined.split('√(').pop().split(')')[0];    

    // replace invalid symbols with valid symbols
    const calcOperations = {
        "x": "*",
        "^": "**",
        "π": "Math.PI",
        // "√": `Math.sqrt(${radicand})`
    };
    calcExpNum = expStringJoined.replace(/[x^π]/g, i => calcOperations[i]).replace("()", "");

    // check if all parenthesis are closed
    let openParCount = 0;
    let closeParCount = 0;
    for(i of calcExpNum) {
        if(i === "("){
            openParCount++
        };
        if(i === ")"){
            closeParCount++
        };
    };

    if (openParCount != closeParCount){
        calcAnswer.textContent = "Error: make sure all parentheses are closed";
        calcAnswer.style.fontSize = "20px";
    } else {
        calcAnswer.textContent = 123;
        calcAnswer.style.fontSize = "40px";
    };
    
    // let finalResult = Number(eval(calcExpNum).toFixed(8))
    console.log(calcExpNum);
};

// Find radicand for squareroots
const findRadicand = (radicandString) => {

    let openParCount2 = 0;
    let closeParCount2 = 0;
    let parIndex = 0;
    let newRadicand = "";
    while (openParCount2 > closeParCount2 && radicandString.length > parIndex) {
        newRadicand += radicandString[parIndex];
        parIndex++;
        if (radicandString[parIndex] == "("){
            openParCount2++
        };
        if (radicandString[parIndex] == ")"){
            closeParCount2++
        };
    }
    
    console.log(newRadicand);


    // return modified radicandString with Math.sqrt(radicand) + extra code here
}


// Bugs radical, delete button for a limit exceeding