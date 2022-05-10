//Defining variables
let mainValue = '';
let savedValue = '';
let operator = '';
let operatorEnteredLast = false;
let operationStarted = false;

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
        clickNumber();
      })
    } else if (validOperators.includes(key.id)) {
      key.addEventListener('click', function(event) {
        operator = key.id;
        clickOperator();
      })
    } else if (key.id === 'clear-button') {
      key.addEventListener('click', function() {
        changeValue(0);
        showMainValue();
      })
    }
  })
}

addKeysListeners()

function showMainValue() {
  let screenBottom = document.getElementById('bottom-screen');
  screenBottom.innerHTML = mainValue;
}

function showSavedValue() {
  let screenTop = document.getElementById('top-screen');
  screenTop.innerHTML = savedValueWithOperator;
}

function changeValue(a) {
  mainValue = a;
}

function clickNumber() {
  if (!operatorEnteredLast) {
    mainValue += Number(event.target.id);
    showMainValue();
    operatorEnteredLast = false;
  } else {
    mainValue = '';
    mainValue += Number(event.target.id);
    showMainValue();
    operatorEnteredLast = false;
  }
}

function clickOperator() {
  if (operationStarted) {
    savedValue = operate(operator, savedValue, mainValue);
    savedValueWithOperator = savedValue + ' ' + operator;
    showSavedValue();
  } else {
    savedValue = mainValue;
    savedValueWithOperator = savedValue + ' ' + operator;
    operatorEnteredLast = true;
    operationStarted = true;
    showSavedValue();
  }
}
