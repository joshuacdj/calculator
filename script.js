const MAXDISPLAYLENGTH = 34;

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

        // If the display is full, do nothing
        if (currCalc.length === 33) {
            return;
        }

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

        // If operator is the 33rd character, do nothing
        if (currCalc.length === 33) {
            return;
        }

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

    let num1 = 0;
    let num2 = 0;

    if (numsArray[0].includes(".")) { 
        num1 = parseFloat(numsArray[0], 10);
    } else {
        num1 = parseInt(numsArray[0], 10);
    }

    if (numsArray[2].includes(".")) {
        num2 = parseFloat(numsArray[2], 10);
    } else {
        num2 = parseInt(numsArray[2], 10);
    }


    // Calculate the answer
    let ans = operate(num1, num2, op);

    if (ans % 1 !== 0) {
        ans = ans.toFixed(12);
    }

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

    // If negative is the 33rd character, do nothing
    if (currCalc.length === 33) {
        return;
    }

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


// function to check that there is only one decimal point in a number. The decimal point cannot be the end of the number and there cannot be two decimal points in a number
function validDecimal(num) {

    let count = 0;

    for (let i = 0; i < num.length; i++) {

        if (num[i] === ".") {
            count++;
        }
    }

    return (count === 1 && num[num.length - 1] !== ".");
}

// dec button event listener
const decBtn = document.querySelector("#dec");

decBtn.addEventListener("click", event => {
    
        recentType = "dec";

        // If the decimal is the 33rd character, do nothing
        if (currCalc.length === 33) {
            return;
        }
    
        // If the most recent button pressed was an operator, add a space before the decimal point
        if (isRecentOp(currCalc)) {
            currCalc += " ";
        }

        // Split the current calculation into an array
        let arr = currCalc.split(" ");

        // If the most recent number has a decimal point, do nothing
        if (arr[arr.length - 1].includes(".")) {
            return;
        }

        // If the most recent number is empty or is negative, add a 0 before the decimal point
        if (!arr[arr.length - 1] || arr[arr.length - 1] === "–") {
            currCalc += "0.";
        } else {
            currCalc += ".";
        }

        currDisplay.textContent = currCalc;
    
});

