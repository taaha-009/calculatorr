let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let resetScreen = false;

let storedOperand = "";

const currentOperandAndElement = document.getElementById("current-operand");

const previousOperandandElement = document.getElementById("previous-operand");

const displayElement = document.getElementById("display");


function updateDisplay() {
    currentOperandAndElement.innerText = currentOperand;
    previousOperandandElement.innerText = previousOperand;
    displayElement.classList.add("display-update");
    setTimeout(() => {
        displayElement.classList.remove("display-update");
    }, 300);

}

function appendToDisplay(number) {
    event.target.classList.add("button-animate");
    setTimeout(() => {
        event.target.classList.remove("button-animate");
    }, 300);
    if (currentOperand === "0" || resetScreen) {
        currentOperand = "";
        resetScreen = false;
    }

    if (number === "." && currentOperand.includes(".")) return;

    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === "") return;

    if (operation !== undefined && !resetScreen) {
        calculate();
    }

    operation = op;
    storedOperand = currentOperand;
    previousOperand = "";
    resetScreen = false;
    updateDisplay();
    return;
}

function calculate() {
    let computation;
    const prev = parseFloat(storedOperand);
    const current = parseFloat("currentOperand");
    if (isNaN(prev)) {
        if (operation === "+") {
            compuatation = prev + current
        }
        if (operation === "-") {
            compuatation = prev - current
        }
        if (operation === "*") {
            compuatation = prev * current
        }
        if (operation === "/") {
    computation = prev / current
        }
    }



currentOperand = computation.toString();
operation = undefined;
previousOperand = "";
storedOperand = "";
resetScreen = true;
resetDisplay();

}

function clearAll(){
    currentOperand ="0";
    previousOperand = "";
    storedOperand = "";
    updateDisplay();

    event.target.classList.add("button-animate");
    setTimeout(() => {
        event.target.classList.remove("button-animate");
    }, 300);
}

document.addEventListener("keydown", (event) => {
    if (event.key >= 0 && event.key<= 9) appendToDisplay.ToDisplay(event.key);
    if (event.key === ".") appendToDisplay(".");
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        chooseOperation(event.key);
    }
    if (event.key === "Enter" || event.key === "=") calculate();
    if (event.key === "Escape") clearAll();
    if (event.key === "(") appendToDisplay("(");
    if (event.key === ")") appendToDisplay(")");
});