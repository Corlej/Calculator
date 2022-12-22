let firstNumber = "0";
let secondNumber = "0";
let result = "0";
let currentOperator;
let currentOperatorKey;
let evaluation = [];
const screen = document.querySelector(".screen");
const keyboard = document.querySelector(".keyboard");

keyboard.addEventListener('click', function(e) {
    e.stopImmediatePropagation()
    onButtonPress(e);
});


//keydown input
$(window).keydown(function(e) {
    var code = e.keyCode;
    var kc = String.fromCharCode(e.keyCode);
    
    if (e.which == 53) {
        if (e.shiftKey) {
            {$('.percentage').addClass('triggerAnimation'), setTimeout(function () {
                $('.percentage').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
        else {
            {$('.five').addClass('triggerAnimation'), setTimeout(function () {
                $('.five').removeClass('triggerAnimation');
            }, 100)}
            assignNumberFromKey(e)
        }
    }

    else if (e.which == 56) {
        if (e.shiftKey) {
            {$('.multiply').addClass('triggerAnimation'), setTimeout(function () {
                $('.multiply').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
        else {
            {$('.eight').addClass('triggerAnimation'), setTimeout(function () {
                $('.eight').removeClass('triggerAnimation');
            }, 100)}
            assignNumberFromKey(e)
        }
    }

    else if (e.which == 189) {
        if (e.altKey) {
            {$('.plusMinus').addClass('triggerAnimation'), setTimeout(function () {
                $('.plusMinus').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
        else {
            {$('.subtract').addClass('triggerAnimation'), setTimeout(function () {
                $('.subtract').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
    }

    else if (e.which == 187 || e.which == 13) {
        if (e.shiftKey) {
            {$('.add').addClass('triggerAnimation'), setTimeout(function () {
                $('.add').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
        else {
            {$('.total').addClass('triggerAnimation'), setTimeout(function () {
                $('.total').removeClass('triggerAnimation');
            }, 100)}
            assignOperationFromKey(e)
        }
    }

    else if (e.which == 67 || e.which == 27) {
        $('.clear').addClass('triggerAnimation'), setTimeout(function () {
            $('.clear').removeClass('triggerAnimation');
        }, 100)
        assignOperationFromKey(e)
    }

    else if (e.which == 88){
        $('.multiply').addClass('triggerAnimation'), setTimeout(function () {
            $('.multiply').removeClass('triggerAnimation');
        }, 100)
        assignOperationFromKey(e)
    }    

    else if (e.which == 191){
        $('.divide').addClass('triggerAnimation'), setTimeout(function () {
            $('.divide').removeClass('triggerAnimation');
        }, 100)
        assignOperationFromKey(e)
    }    
    
    else if (e.key >= 0 && e.key <= 9){
        $("div[data-code='"+code+"']").addClass('triggerAnimation'), setTimeout(function () {
            $("div[data-code='"+code+"']").removeClass('triggerAnimation');
        }, 100)
        assignNumberFromKey(e)
    }
    
});

//click input
function onButtonPress (e) {
    switch(e.target.getAttribute('data-button-type')) {
        case "digit":
            assignNumber(e),
            (e.target.classList.add('triggerAnimation'), setTimeout(function () {
                (e.target.classList.remove('triggerAnimation'));
            }, 100));
            break;
        case "operator":
            assignOperation(e),
            (e.target.classList.add('triggerAnimation'), setTimeout(function () {
                (e.target.classList.remove('triggerAnimation'));
            }, 100));(e)
            break;
    }
    render(e);
}

function assignNumber(e) {

    if(evaluation.length <= 1) {
        firstNumber = firstNumber == "0" 
            ? e.target.getAttribute("data-value")
            : firstNumber + e.target.getAttribute("data-value")

        if(evaluation.length == 1) evaluation.shift();
        evaluation.push(firstNumber)

        result = firstNumber;
        return;
    }

    if (evaluation.length >= 2) {
        secondNumber = secondNumber == "0"
            ? e.target.getAttribute("data-value")
            : secondNumber + e.target.getAttribute("data-value");
        if(evaluation.length == 3) evaluation.pop();
        evaluation.push(secondNumber);
        result = secondNumber;
    }
}

function assignNumberFromKey(e) {
    if(evaluation.length <= 1) {
        firstNumber = firstNumber == "0" 
            ? e.key
            : firstNumber + e.key
        
        if(evaluation.length == 1) 
        evaluation.shift();
        evaluation.push(firstNumber)
        result = firstNumber;
        renderFromKey();
        return;
    }

    if (evaluation.length >= 2) {
        secondNumber = secondNumber == "0"
            ? e.key
            : secondNumber + e.key
        if(evaluation.length == 3) evaluation.pop();
        evaluation.push(secondNumber);
        result = secondNumber;
        renderFromKey();
    }
};

function assignOperation(e) {
    currentOperator = e.target.getAttribute('data-value');

    // Exclusive operations that can be performed with one number, in the case of clear it can be executed even when the evaluation array is empty
    if(currentOperator == "%" || currentOperator == "+/-" || currentOperator == "clear" || currentOperator == "=") return operate();

    if(evaluation.length == 3) operate()
    ;
    if(evaluation.length == 2) evaluation.pop()
    ;
    evaluation.splice(1, 1, currentOperator);
}

function assignOperationFromKey(e) {
    if (e.which == 53 && e.shiftKey) {
        currentOperatorKey = '%'
    };
    if (e.which == 27) {
        currentOperatorKey = 'clear'
    };
    if (e.which == 13 || (e.which == 187)) {
        currentOperatorKey = '='
        $('div[data-button-type="operator"]').removeClass('selectedOperation')
    }; 
    if ((e.which == 56 && e.shiftKey) || e.which == 88) {
        currentOperatorKey = '*'
        $('div[data-button-type="operator"]').removeClass('selectedOperation')
        $('.multiply').addClass('selectedOperation')
    };
    if (e.which == 187 && e.shiftKey) {
        currentOperatorKey = '+'
        $('div[data-button-type="operator"]').removeClass('selectedOperation')
        $('.add').addClass('selectedOperation')
    };
    if (e.which == 189) {
        currentOperatorKey = '-'
        $('div[data-button-type="operator"]').removeClass('selectedOperation')
        $('.subtract').addClass('selectedOperation')
    };
    if (e.which == 191) {
        currentOperatorKey = '/'
        $('div[data-button-type="operator"]').removeClass('selectedOperation')
        $('.divide').addClass('selectedOperation')
    };
    if (e.which == 189 && e.altKey) {
        currentOperatorKey = '+/-'
    };
    
    if(currentOperatorKey == '%' || currentOperatorKey == '+/-' || currentOperatorKey == 'clear' || currentOperatorKey == '=') return operateKey();
    
    if(evaluation.length == 3) operateKey(), console.log(evaluation);
    if(evaluation.length == 2) evaluation.pop(),console.log(evaluation);
    evaluation.splice(1, 1, currentOperatorKey), console.log(evaluation);
}

function operateKey() {
    if (currentOperatorKey == '%' && evaluation.length) {
        let number = parseInt(evaluation[evaluation.length - 1])
        result =  (number / 100).toString();
        evaluation.splice(evaluation.length - 1, 1, result);
    }

    if(currentOperatorKey == '+/-' && evaluation.length) {
        result = (evaluation[evaluation.length - 1] * -1).toString();
        evaluation.splice(evaluation.length - 1, 1, result);
    }

    if(currentOperatorKey == "clear") {
        if(evaluation.length <= 2) {
            firstNumber = "0";
            evaluation = [];
            result = "0";
        }
        if(evaluation.length == 3) {
            secondNumber = "0";
            evaluation = [firstNumber.toString()]
            result = firstNumber.toString();
        }
    }

    if(evaluation.length == 3) {
        console.log (evaluation)
        result = (eval(evaluation.join().replace(/,/g, ""))).toString();
        firstNumber = result;
        secondNumber = "0";
        evaluation = [firstNumber]
    }
    renderFromKey();
    return;
}

function operate() { 
    if(currentOperator == "%" && evaluation.length) {
        let number = parseInt(evaluation[evaluation.length - 1])
        result =  (number / 100).toString();
        evaluation.splice(evaluation.length - 1, 1, result);
        return;
    }

    if(currentOperator == "+/-" && evaluation.length) {
        result = (evaluation[evaluation.length - 1] * -1).toString();
        evaluation.splice(evaluation.length - 1, 1, result);
        return;
    }

    if(currentOperator == "clear") {
        if(evaluation.length <= 2) {
            firstNumber = "0";
            evaluation = [];
            result = "0";
            return;
        }
        if(evaluation.length == 3) {
            secondNumber = "0";
            evaluation = [firstNumber.toString()]
            result = firstNumber.toString();
            return;
        }
    }
    if(evaluation.length == 3) {
        console.log (evaluation)
        result = (eval(evaluation.join().replace(/,/g, ""))).toString();
        firstNumber = result;
        secondNumber = "0";
        evaluation = [firstNumber]
    }
}

function render(e) {
    const clearButton = document.querySelector('div[data-value="clear"]');

    let newOperatorBtn = e.target;

    let lastOperatorBtn = document.querySelector('.selectedOperation');

    lastOperatorBtn ? lastOperatorBtn.classList.remove('selectedOperation') : null;
    newOperatorBtn ? newOperatorBtn.classList.add('selectedOperation') : null;

    // change screen's font-size
    switch(result.toString().length) {
        case 7:
            screen.style.fontSize = "4.7rem"
            break;
        case 8:
            screen.style.fontSize = "4.1rem"
            break;
        case 9: 
            screen.style.fontSize = "3.65rem"
            break
    }

    if(result.toString().length > 9) {
        screen.textContent = parseFloat(result).toPrecision(3);
    } else {
        screen.textContent = result;
    }

    evaluation.length == "0"
        ? clearButton.textContent = 'AC'
        : clearButton.textContent = 'C'

    
}

function renderFromKey(e) {
    const clearButton = document.querySelector('div[data-value="clear"]');

    switch(result.toString().length) {
        case 7:
            screen.style.fontSize = "4.7rem"
            break;
        case 8:
            screen.style.fontSize = "4.1rem"
            break;
        case 9: 
            screen.style.fontSize = "3.65rem"
            break
    }

    if(result.toString().length > 9) {
        screen.textContent = parseFloat(result).toPrecision(3);
    } else {
        screen.textContent = result;
    }

    evaluation.length == "0"
    ? clearButton.textContent = 'AC'
    : clearButton.textContent = 'C'

};

//spamming percentage has issues that needs resolved
//font-size needs to be more responsive. Esp on C or CA
//When you hit enter multiple times can it trigger the previous operation?
