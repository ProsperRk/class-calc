const inputBar = document.getElementById("input");
const outputBar = document.getElementById("output");
const btnNum = document.querySelectorAll(".vbtn");
const action = document.querySelector(".action");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del")


function appendChar(char) {
    inputBar.value += char;
}

function clearAll() {
    inputBar.value = "";
    outputBar.value = "";
}

function delLastDig() {
    inputBar.value = inputBar.value.slice(0,-1);
}

function parseString(input) {
    const regex = /(\d+\.?\d*)|([+\-*/])/g; 

    const tokens = [];
    let match = regex.exec(input);

    while (match) {
        tokens.push(match[0]);
        match = regex.exec(input);
    }

    return tokens
}

function calculate(strArr) {
    const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    }

    const precedence = ["*", "/", "+", "-"];
    
    for (let operator of precedence) {
        let index = strArr.indexOf(operator); 
        
        while (index !== -1) {
            let left = Number(strArr[index - 1]);
            let right = Number(strArr[index + 1]);

            let result = operators[operator](left, right);

            strArr.splice(index - 1, 3, result);
            index = strArr.indexOf(operator);

            return strArr[0];
        }
    }

   
}

function finalCalc(input) {
    let tokens = parseString(input);
    let result = calculate(tokens);

    outputBar.value = result.toString();
}





btnNum.forEach((btn) => {
    btn.addEventListener("click", () => appendChar(btn.value));
});

action.addEventListener("click", () => finalCalc(inputBar.value));
clear.addEventListener("click", () => clearAll());
del.addEventListener("click", () => delLastDig());
