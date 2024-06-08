
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

function calcToArray(calc) {

    // let start = 0;
    // let end = 0;

    // // Stop when the operator is met
    // while (!isOp(calc[end])) {

    //     end++;
    // }

    // let num1 = calc.slice(start, end - 1);

    // // skip the whitespace as well and on to the start of num2
    // start = end + 2;

    // let num2 = calc.slice(start, calc.length);
    // let arr = [num1, num2];

    // return arr;

    let arr = calc.split(" ");

    console.log(arr[0]);
    console.log(arr[1]);
    console.log(arr[2]);
    return arr;
}


let op = "";
let currCalc = "";
let prevCalc = "";


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

        let num = numBtn.textContent;

        // Prevent keying in of leading zeros
        // if ((!currCalc && num === "0") || (isRecentOp(currCalc) && num === "0")) {

        //     /*blank*/

        // } else {


            if (isRecentOp(currCalc)) {
                currCalc += " ";
            }
    
            currCalc += num;
    
            currDisplay.textContent = currCalc;

        // }
    
    });
});

// Operator buttons event listener
const opBtns = document.querySelectorAll(".operator");

opBtns.forEach(opBtn => {

    opBtn.addEventListener("click", event => {

        op = opBtn.textContent;

       if (containsOp(currCalc)) {
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

    // Either empty (first number is negative)
    // Or right before is an operator (second number is negative)

    if (!currCalc) {

        currCalc += "–";

    } else if (isRecentOp(currCalc)) {

        currCalc += " –";
    }

    currDisplay.textContent = currCalc;

})


































