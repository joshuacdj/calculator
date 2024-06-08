
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


function operate(num1, num2, op) {

    switch (op) {

        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1,num2);
        case "x":
            return multiply(num1, num2);
        default:
            return divide(num1, num2);
    }
}

function isOp(op) {

    return (op === "+" || op === "-" || op === "÷" || op === "x");
}

// Check for the count of numbers in the calculation
// There can be 1 number only or 2 numbers
function getCountOfNums(calc) { 

    let arr = calc.split(" ");

    let count = 0;

    if (arr[0]) {
        count++;
    }

    if (arr[2]) {
        count++;
    }
    
    return count;
}

function calcToArray(calc) {


    let arr = calc.split(" ");

// console.log(arr[0]);
// console.log(arr[1]);
// console.log(arr[2]);

    return arr;
}


let op = "";
let currCalc = "";
let prevCalc = "";

// Store the most recently pressed button type
let recentType = "";

// Function to check whether most recently pressed was a number or not
function isRecentNumber(currCalc) {

    const num = "0123456789";

    return num.includes(currCalc[currCalc.length - 1]);
}

// Function to check whether there is an operator or not

function containsOp(currCalc) {

    const ops = "+-÷x";

    for (let i = 0; i < currCalc.length; i++) {

        if (ops.includes(currCalc[i])) {
            return true;
        }
    }

    return false;

}

// Function to check if most recently pressed was an operator or not

function isRecentOp(currCalc) {

    const ops = "+-÷x";

    return ops.includes(currCalc[currCalc.length - 1]);
}

// Function to clear everything
// Clearing everything means 1) prevCalc and display is reset, 2) currCalc and display is cleared, 3) op is cleared
function clearEvery() {

    prevCalc = "~";
    prevDisplay.textContent = prevCalc;

    currCalc = "";
    currDisplay.textContent = currCalc;

    op = "";
}

const numberBtns = document.querySelectorAll(".number");

const currDisplay = document.querySelector(".curr-calc");

// Number buttons event listener
numberBtns.forEach(numBtn => {

    numBtn.addEventListener("click", event => {

        // If the recentType is equals, clear everything
        if (recentType === "equals") {
            clearEvery();
        }

        recentType = "number";

        let num = numBtn.textContent;
    
        // If the most recent button pressed was an operator, add a space before the number
        if (isRecentOp(currCalc)) {
            currCalc += " ";
        }

        currCalc += num;

        currDisplay.textContent = currCalc;

        
    
    });
});

// Operator buttons event listener
const opBtns = document.querySelectorAll(".operator");

opBtns.forEach(opBtn => {

    opBtn.addEventListener("click", event => {

        recentType = "operator";

        op = opBtn.textContent;

       if (containsOp(currCalc) || !currCalc) {
            /* BLANK */
        }   else if (isRecentOp(currCalc)) { // prevent multiple operators in succession
            currCalc = currCalc.substring(0, currCalc.length - 1);
            currCalc += " " + op;
        } else {
            currCalc += " " + op;
        } 

        currDisplay.textContent = currCalc;
    })
})


// equals button event listener
const equalsBtn = document.querySelector("#equals");

const prevDisplay = document.querySelector(".prev-calc");

equalsBtn.addEventListener("click", event => {

    // If there is no currDisplay, do nothing
    if (!currCalc) {
        return;
    }

    // If there is only one number, do nothing
    if (getCountOfNums(currCalc) === 1) {
        return;
    }

    // Update recentType
    recentType = "equals";

    // Update the prevDisplay whenever equals is pressed
    prevCalc = currCalc + " =";
    prevDisplay.textContent = prevCalc;

    let numsArray = calcToArray(currCalc);

    // Deal with negative numbers '–' en dash symbol used to differentiate
    numsArray[0] = numsArray[0].replace("–", "-");
    numsArray[2] = numsArray[2].replace("–", "-");

    // Calculate the answer
    let ans = operate(parseInt(numsArray[0], 10), parseInt(numsArray[2], 10), op);

    currCalc = "" + ans;

    currCalc = currCalc.replace("-", "–");

    currDisplay.textContent = currCalc;

});


// C button to clear everything eventlistener
const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", clearEvery);


// neg button
const negBtn = document.querySelector("#neg");

negBtn.addEventListener("click", event => {

    recentType = "neg";

    // Either empty (first number is negative)
    // Or right before is an operator (second number is negative)

    if (!currCalc) {

        currCalc += "–";

    } else if (isRecentOp(currCalc)) {

        currCalc += " –";
    }

    currDisplay.textContent = currCalc;

})

// Clear entry button which clears the most recent entry
const clearEntryBtn = document.querySelector("#clear-entry");

clearEntryBtn.addEventListener("click", event => {

    // If the most recent button pressed was an operator, remove the operator
    if (isRecentOp(currCalc) || currCalc[currCalc.length - 1] === " ") {
        currCalc = currCalc.substring(0, currCalc.length - 2);
    } else {
        currCalc = currCalc.substring(0, currCalc.length - 1);
    }

    currDisplay.textContent = currCalc;

});


































