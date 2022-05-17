//Defining variables
let mainValue = '';
let savedValue = '';
let secondSavedValue = '';
let operator = '';
let equalSign = '';

let previousOperator = false;


// Defining elements
let topScreenSavedValue = document.getElementById('ts-saved-value');
let topScreenOperator = document.getElementById('ts-operator');
let topScreenSecondSavedValue = document.getElementById('ts-second-saved-value');
let topScreenEqual = document.getElementById('ts-equal');

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
  let numA = Number(a);
  let numB = Number(b);
  if (operator === '+') {
    let total = roundTo(add(numA, numB));
    if (isNaN(total) || total === undefined) {
      clearValues();
      return 'Error'
    } else {
      return total;
    }
  } else if (operator === '-') {
    let total = roundTo(subtract(numA, numB));
    if (isNaN(total)) {
      clearValues();
      return 'Error'
    } else {
      return total;
    }
  } else if (operator === '×') {
    let total = roundTo(multiply(numA, numB))
    if (isNaN(total)) {
      clearValues();
      return 'Error';
    } else {
      return total;
    }
  } else if (operator === '÷') {
    let total = roundTo(divide(numA, numB));
    if (isNaN(total) || total === undefined) {
      clearValues();
      return 'Error'
    } else {
      return total;
    }
  }
}

function makeClear() {
  let container = document.getElementById('clear-delete-container');
  let makeDiv = document.createElement('div');
  makeDiv.textContent = 'CLEAR';
  makeDiv.classList.add('key');
  makeDiv.setAttribute('id', 'clear-button');
  container.appendChild(makeDiv);
}

function makeDelete() {
  let container = document.getElementById('clear-delete-container');
  let makeDiv = document.createElement('div');
  makeDiv.textContent = 'DELETE';
  makeDiv.classList.add('key');
  makeDiv.setAttribute('id', 'delete-button');
  container.appendChild(makeDiv);
}

makeClear();
makeDelete();


function makeNumberRows() {
  let container = document.getElementById('key-container');
  for (i = 0; i < 4; i++) {
    let makeDiv = document.createElement('div');
    makeDiv.classList.add('class');
    makeDiv.setAttribute('id', 'row' + i);
    container.appendChild(makeDiv);
  }
}

makeNumberRows();

let keysArray = [
  [
  '7',
  '8',
  '9',
  '÷'
],
  [
  '4',
  '5',
  '6',
  '×'
],
  [
  '1',
  '2',
  '3',
  '-'
],
  [
  '.',
  '0',
  '=',
  '+'
  ]
]


function addKeys() {
  for (i = 0; i < 4; i++) {
    let container = document.getElementById('row' + i);
    keysArray[i].forEach(function(key) {
      let makeDiv = document.createElement('div');
      let makeSpan = document.createElement('span');
      makeSpan.textContent = key;
      makeDiv.classList.add('key');
      makeDiv.setAttribute('data-number', key);
      makeDiv.setAttribute('id', key);
      makeSpan.setAttribute('data-number', key);
      makeSpan.setAttribute('id', key);
      makeDiv.appendChild(makeSpan);
      container.appendChild(makeDiv);
    })
  }
}

addKeys();

let validNumbers = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

let validOperators = [
  '+',
  '-',
  '×',
  '÷'
]

function addKeysListeners() {
  let keys = document.querySelectorAll('.key');
  keys.forEach(function(key) {
    if (validNumbers.includes(key.id)) {
      key.addEventListener('click', function(event) {
        clickNumber(event.target.id);
      })
    } else if (validOperators.includes(key.id)) {
      key.addEventListener('click', function(event) {
        clickOperator(key.id);
      })
    } else if (key.id === '.') {
      key.addEventListener('click', function(event) {
        clickDecimal();
      })
    } else if (key.id === 'clear-button') {
      key.addEventListener('click', function() {
        clearValues();
        showBottomScreen();
      })
    } else if (key.id === 'delete-button') {
      key.addEventListener('click', function() {
        backSpace();
      })
    } else if (key.id === '=') {
      key.addEventListener('click', function() {
        clickEquals();
      })
    }
  })
}

addKeysListeners();



// '.',
// '/',
// '*',
// '+',
// '-',
// '='

document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
  let key = e.key;
  console.log(key);
  if (validNumbers.includes(key)) {
    clickNumber(key);
  } else if (key === '.') {
    clickDecimal();
  } else if (key === 'Backspace') {
    backSpace();
  } else if (validOperators.includes(key)) {
    clickOperator(key);
  } else if (key === '=' || key === 'Enter') {
    clickEquals();
  }
}

function showBottomScreen() {
  let screenBottom = document.getElementById('bs-main-value');
  screenBottom.innerHTML = mainValue;
}

function showTopScreen() {
  topScreenSavedValue.innerHTML = savedValue;
  topScreenOperator.innerHTML = operator;
  topScreenSecondSavedValue.innerHTML = secondSavedValue;
  topScreenEqual.innerHTML = equalSign;
}

function clearValues() {
  mainValue = '';
  savedValue = '';
  secondSavedValue = '';
  operator = '';
  equalSign = '';
  showTopScreen();
  showBottomScreen();
}

function backSpace() {
  if (mainValue.length > 0) {
    mainValue = mainValue.slice(0, -1);
    showBottomScreen();
  }
}

function clickNumber(key) {
  if (mainValue === 'Error') {
    mainValue = '';
    mainValue += Number(key);
    showBottomScreen();
  } else {
    mainValue += Number(key);
    showBottomScreen();
  }
}

function clickDecimal() {
  if (!mainValue.includes('.')) {
    mainValue += '.';
    showBottomScreen();
  }
}

function clickOperator(input) {
  if (mainValue === '') {
    operator = input;
    showTopScreen();
  } else if (!operationUnderway()) {
    operator = input;
    savedValue = mainValue;
    mainValue = '';
    showTopScreen();
    showBottomScreen();
    console.log('hi');
  } else {
    savedValue = `${operate(operator, savedValue, mainValue)}`;
    operator = input;
    mainValue = '';
    secondSavedValue = '';
    equalSign = '';
    showTopScreen();
    showBottomScreen();
    console.log('bye');
  }
}

function clickEquals() {
  equalSign = '=';
  secondSavedValue = mainValue;
  mainValue = `${operate(operator, savedValue, secondSavedValue)}`;
  showTopScreen();
  showBottomScreen();
  savedValue = '';
  secondSavedValue = '';
  operator = '';
  equalSign = '';
}

function operationUnderway() {
  if (!(savedValue === '') && !(mainValue === '') && !(operator === '')) {
    return true;
  } else {
    return false;
  }
}

function roundTo(num) {
    return +(Math.round(num + "e+3")  + "e-3");
}
