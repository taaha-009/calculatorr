let currentOperand = "0";          // Stores the currently displayed number (as string)
let previousOperand = "";          // Stores the previous operand and operation for display
let operation = undefined;         // Stores the current operation (+, -, *, /)
let resetScreen = false;           // Flag to determine if screen should be cleared on next input

// Stores the first operand for calculations
let storedOperand = "";
// Reference to current operand display
const currentOperandElement = document.getElementById("current-operand");
// Reference to previous operand display
const previousOperandElement = document.getElementById("previous-operand");
// Reference to main display element
const displayElement = document.getElementById("display");


function updateDisplay() {
    currentOperandElement.innerText = currentOperand;// Update current operand display
    previousOperandElement.innerText = previousOperand;// Update previous operand display

    // Add animation to display
    displayElement.classList.add("display-update");// Add animation class
    setTimeout(() => {
        displayElement.classList.remove("display-update");// Remove animation after 300ms
    }, 300);
}

function appendToDisplay(number) {
    // Add button press animation
    event.target.classList.add("button-animate");
    setTimeout(() => {
        event.target.classList.remove("button-animate");
    }, 300);

    // Reset screen if needed (after calculation or operation)
    if (currentOperand === "0" || resetScreen) {
        currentOperand = "";
        resetScreen = false;
    }

    // Prevent multiple decimal points
    if (number === "." && currentOperand.includes(".")) return;

    currentOperand += number;  // Append the number as operand 
    updateDisplay();           // Update the display
}

function chooseOperation(op) {
    if (currentOperand === "") return;  // Ignore if no current operand

    // If there's a pending operation, calculate it first
    if (operation !== undefined && !resetScreen) {
        calculate();
    }

    operation = op;                     // Store the operation
    storedOperand = currentOperand;     // Store the current operand
    previousOperand = `${currentOperand} ${operation}`; // Update display
    currentOperand = "";                // Clear for next input
    resetScreen = false;
    updateDisplay();
}

function calculate() {
    let computation; //undefined variable
    const prev = parseFloat(storedOperand);   // Convert to number(fractional)
    const current = parseFloat(currentOperand); // Convert to number(fractional)

    // If no previous operand, just store current and return
    if (isNaN(prev)) {
        storedOperand = currentOperand;
        previousOperand = "";
        operation = undefined;
        updateDisplay();
        return;
    }

    if (isNaN(current)) return;  // Ignore if no current operand

    // Perform the calculation based on operation
    if (operation === "+") {
        computation = prev + current;
    } else if (operation === "-") {
        computation = prev - current;
    } else if (operation === "*") {
        computation = prev * current;
    } else if (operation === "/") {
        computation = prev / current;
    } else {
        return;
    }

    // Update state with result
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = "";
    storedOperand = "";
    resetScreen = true;  // Set flag to reset screen on next input
    updateDisplay();
}

function clearAll() {
    // Reset all state variables
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;
    storedOperand = "";
    updateDisplay();

    // Add button animation
    event.target.classList.add("button-animate");
    setTimeout(() => {
        event.target.classList.remove("button-animate");
    }, 300);
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    if (event.key >= 0 && event.key <= 9) appendToDisplay(event.key);  // Number keys
    if (event.key === ".") appendToDisplay(".");                      // Decimal point
    if (event.key === "+" || event.key === "-" ||
        event.key === "*" || event.key === "/") {
        chooseOperation(event.key);                                   // Operation keys
    }
    if (event.key === "Enter" || event.key === "=") calculate();     // Calculate
    if (event.key === "Escape") clearAll();                          // Clear
    if (event.key === "(") appendToDisplay("(");                     // Parentheses
    if (event.key === ")") appendToDisplay(")");                     // Parentheses
});