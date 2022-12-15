let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let resetDisplay = false
let buttonglow

const modifierBtn = document.querySelectorAll('[data-modifier]')
const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const decimalBtn = document.getElementById('decimalBtn')
const equalBtn = document.getElementById('equalBtn')
const dataEqualBtn = document.querySelectorAll('[data-equal]')
const clearBtn = document.getElementById('clearBtn')
const clearAllBtn = document.getElementById('clearAllBtn')
const plusMinus = document.getElementById('plusMinus')
const percentage = document.getElementById('percentage')
const currentDisplay = document.getElementById('currentDisplay')
const btn = document.getElementsByClassName('btn')


window.addEventListener('keydown', keyboardInput)
equalBtn.addEventListener('click', findTotal)
clearBtn.addEventListener('click', clearCurrent)
decimalBtn.addEventListener('click', decimal)


numberBtn.forEach((button) => 
    button.addEventListener('click', () => inputNumber((button.innerText), (button.classList.add('numberClicked'), setTimeout(function () {
        button.classList.remove('numberClicked');
    }, 100))
    ))
)

operatorBtn.forEach((button) => 
    button.addEventListener('click', () => (button.classList.add('numberClicked'), setTimeout(function () {
        button.classList.remove('numberClicked');
    }, 100), ($(operatorBtn).removeClass('operatorClicked')),(button.classList.add('operatorClicked'))
    ))
)

modifierBtn.forEach((button) => 
    button.addEventListener('click', () => (button.classList.add('numberClicked'), setTimeout(function () {
        button.classList.remove('numberClicked');
    }, 100)))
)

dataEqualBtn.forEach((button) => 
    button.addEventListener('click', () => (button.classList.add('numberClicked'), setTimeout(function () {
        button.classList.remove('numberClicked');
    }, 100), ($(operatorBtn).removeClass('operatorClicked'))
    ))
);

decimalBtn.addEventListener('click', () => (decimalBtn.classList.add('numberClicked'), setTimeout(function () {
    decimalBtn.classList.remove('numberClicked');
}, 100)));

clearBtn.addEventListener('click', () => ($(operatorBtn).removeClass('operatorClicked')));

$(document).keydown(function(e) {
    if (e.which ==  49){
        $('.one').addClass('numberClicked'), setTimeout(function () {
            $('.one').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  50){
        $('.two').addClass('numberClicked'), setTimeout(function () {
            $('.two').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  51){
        $('.three').addClass('numberClicked'), setTimeout(function () {
            $('.three').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  52){
        $('.four').addClass('numberClicked'), setTimeout(function () {
            $('.four').removeClass('numberClicked');
        }, 100)
    }
    if (e.which == 53){
        if (e.shiftKey) {
            $('.percentage').addClass('numberClicked'), setTimeout(function () {
                $('.percentage').removeClass('numberClicked');
            }, 100)
        }
        else {
            $('.five').addClass('numberClicked'), setTimeout(function () {
                $('.five').removeClass('numberClicked');
            }, 100)
        }
    }    
    if (e.which ==  54){
        $('.six').addClass('numberClicked'), setTimeout(function () {
            $('.six').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  55){
        $('.seven').addClass('numberClicked'), setTimeout(function () {
            $('.seven').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  56){
        if (e.shiftKey) {
            $('.multiply').addClass('numberClicked'), setTimeout(function () {
                $('.multiply').removeClass('numberClicked');
            }, 100), $('.multiply').addClass('operatorClicked')
        }
        else {
            $('.eight').addClass('numberClicked'), setTimeout(function () {
                $('.eight').removeClass('numberClicked');
            }, 100)
        }
    }
    if (e.which ==  57){
        $('.nine').addClass('numberClicked'), setTimeout(function () {
            $('.nine').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  48){
        $('.zero').addClass('numberClicked'), setTimeout(function () {
            $('.zero').removeClass('numberClicked');
        }, 100)
    }
    if ((e.which == 27) || (e.which == 67)){
        $('.clear').addClass('numberClicked'), setTimeout(function () {
            $('.clear').removeClass('numberClicked');
        }, 100)
    }
    if (e.which ==  189){
        if (e.altKey) {
            $('.plusMinus').addClass('numberClicked'), setTimeout(function () {
                $('.plusMinus').removeClass('numberClicked');
            }, 100)
        }
        else {
            $('.subtract').addClass('numberClicked'), setTimeout(function () {
                $('.subtract').removeClass('numberClicked');
            }, 100), $('.subtract').addClass('operatorClicked')
        }
    }
    if (e.which ==  191){
        $('.divide').addClass('numberClicked'), setTimeout(function () {
            $('.divide').removeClass('numberClicked');
        }, 100), $('.divide').addClass('operatorClicked')
    }
    if (e.which == 88){
        $('.multiply').addClass('numberClicked'), setTimeout(function () {
            $('.multiply').removeClass('numberClicked');
        }, 100), $('.multiply').addClass('operatorClicked')
    }
    if (e.which ==  187){
        if (e.shiftKey) {
            $('.add').addClass('numberClicked'), setTimeout(function () {
                $('.add').removeClass('numberClicked');
            }, 100), $('.add').addClass('operatorClicked')
        }
        else {$('.total').addClass('numberClicked'), setTimeout(function () {
            $('.total').removeClass('numberClicked');
            }, 100), $('.btn').removeClass('operatorClicked')
        }
    }
    if (e.which ==  190){
        $('.decimal').addClass('numberClicked'), setTimeout(function () {
            $('.decimal').removeClass('numberClicked');
        }, 100)
    }
});


operatorBtn.forEach((button) => 
    button.addEventListener('click', () => setOperator(button.innerText))

);

function inputNumber(number) {
    if (currentDisplay.innerText === '0' || resetDisplay)
    reset()
    currentDisplay.innerText += number
};
   
function reset() {
    currentDisplay.innerText = ''
    resetDisplay = false
};

function clearCurrent() {
    currentDisplay.innerText = '0'
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
};

function decimal() {
    if (resetDisplay) reset()
    if (currentDisplay.innerText === '') currentDisplay.innerText = '0';
    if (currentDisplay.innerText.includes('.')) return
    currentDisplay.innerText += '.'
};

function deleteNumber() {
    currentDisplay.innerText = currentDisplay.innerText.toString().slice(0, -1)
};

function setOperator(operator) {
    if (currentDisplay !== null) findTotal()
    firstOperand = currentDisplay.innerText
    currentOperation = operator
    resetDisplay = true
};

function findTotal() {
    if (currentOperation === null || resetDisplay) return
    if (currentOperation === '÷' && currentDisplay.innerText === '0') {
        currentDisplay.innerText = 'Not a number'
        return
    }    
    secondOperand = currentDisplay.innerText
    currentDisplay.innerText = mathRound(
        operate(currentOperation, firstOperand, secondOperand)
    )
    currentOperation = null
};

function mathRound(number) {
    return Math.round(number * 10000000) / 10000000
};

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) inputNumber(e.key)
    if (e.key === '.') decimal()
    if (e.key === '=' || e.key === 'Enter' || e.key === 'Return') findTotal()
    if (e.key === 'Backspace' || e.key === 'Delete') deleteNumber()
    if (e.key === 'Escape' || e.key === 'Esc' || e.key === 'c') clearCurrent()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(operator(e.key))
};

function operator(keyboardOperator) {
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '/') return '÷'
};

function add(a, b) {
    return a + b
};
  
function substract(a, b) {
return a - b
};

function multiply(a, b) {
return a * b
};

function divide(a, b) {
return a / b
};

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case '×':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
};