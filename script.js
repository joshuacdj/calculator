
function add(a, b) {

    return a + b;
}

function subtract(a,b) {

    return a - b;
}

function multiply(a, b) {

    return a * b;
}

function divide(a, b) {

    if (b === 0) {

        alert("Unable to divide by 0!");
        return;
    }

    return a / b;
}

let num1 = 0;
let num2 = 0;
let op = "";

function operate(num1, num2, op) {

    switch (op) {

        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1, num2);
        default:
            return divide(num1, num2);
    }
}

let currCalc = "";

















