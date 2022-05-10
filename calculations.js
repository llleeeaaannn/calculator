// Function to add two numbers together
function add(a, b) {
  let total = a + b;
  return total;
}

// Function to subtract one number from another
function subtract(a, b) {
  let total = a - b;
  return total;
}

// Function to multiply one number by another
function multiply(a, b) {
  let total = a * b;
  return total;
}

// Function to divide one number by another
function divide(a, b) {
  let total = a / b;
  return total;
}

// Function which accepts operator and 2 numbers and performs said operation on the numbers
function operate(operator, a, b) {
  if (operator === '+') {
    return(add(a, b));
  } else if (operator === '-') {
    return(subtract(a, b));
  } else if (operator === '*') {
    return(multiply(a, b));
  } else if (operator === '/') {
    return(divide(a, b));
  }
}
