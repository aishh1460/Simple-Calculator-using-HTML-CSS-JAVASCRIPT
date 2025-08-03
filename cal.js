
class Calculator {
    constructor(prevTextElement, currTextElement) {
        this.prevopTextElement = prevTextElement;
        this.curropTextElement = currTextElement;
        this.clear();
    }

    clear() {
        this.currop = '0';
        this.prevop = '';
        this.op = undefined;
    }

    delete() {
        if (this.currop === '0') return;
        this.currop = this.currop.toString().slice(0, -1);
        if (this.currop === '') this.currop = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currop.includes('.')) return;
        if (this.currop === '0' && number !== '.') {
            this.currop = number;
        } else {
            this.currop = this.currop.toString() + number.toString();
        }
    }

    chooseop(op) {
        if (this.currop === '') return;
        if (this.prevop !== '') {
            this.compute();
        }
        this.op = op;
        this.prevop = this.currop;
        this.currop = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevop);
        const current = parseFloat(this.currop);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.op) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currop = computation.toString();
        this.op = undefined;
        this.prevop = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.curropTextElement.innerText = this.getDisplayNumber(this.currop);
        if (this.op != null) {
            this.prevopTextElement.innerText = `${this.getDisplayNumber(this.prevop)} ${this.op}`;
        } else {
            this.prevopTextElement.innerText = '';
        }
    }
}

// DOM hookup
const numberButtons = document.querySelectorAll('[num]');
const opButtons = document.querySelectorAll('[op]');
const equalsButton = document.querySelector('[equals]');
const deleteButton = document.querySelector('[del]');
const allClearButton = document.querySelector('[clear]');
const prevopTextElement = document.querySelector('[prev-op]');
const curropTextElement = document.querySelector('[curr-op]');

const calculator = new Calculator(prevopTextElement, curropTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseop(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    } else if (key === '.') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        let op = key === '*' ? '×' : key === '/' ? '÷' : key;
        calculator.chooseop(op);
        calculator.updateDisplay();
    } else if (key === 'Enter' || key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    } else if (key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

