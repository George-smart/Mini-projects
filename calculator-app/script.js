const switchBtn = document.querySelector('.scroll');
const container = document.querySelector('.calculator')

container.addEventListener('click', e=>{
    const el = e.target;
    const btn = e.target.classList.contains('scroll');
    const num = container.querySelectorAll('.number');
    const previous = container.querySelector('.previous-operand');
    const current = container.querySelector('.current-operand');

    if(btn){
        el.classList.toggle('change')
        container.classList.toggle('light-mode')
        num.forEach(item =>{
            item.classList.toggle('light-mode')
        })
        previous.classList.toggle('light-mode')
        current.classList.toggle('light-mode')
    }
})

const previousOperandText = document.querySelector('[data-previous-operand]'); 
const currentOperandText = document.querySelector('[data-current-operand]');
const numberBtns = document.querySelectorAll('[data-number]'); 
const operatorBtns = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalBtn = document.querySelector('[data-equal]')

class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear()
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.operation !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete(){

        if(this.currentOperand != null){
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
       
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '÷':
                computation = prev / current
                break;
            case '+':
                computation = prev + current
                break;
            case '*':
                computation = prev * current
                break;
            case '-':
                computation = prev - current
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ""
    }
    displayUI(){
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }


}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberBtns.forEach(button =>{
  button.addEventListener('click', ()=>{
      calculator.appendNumber(button.innerText);
      calculator.displayUI();
  });
});

clearBtn.addEventListener('click', ()=>{
    calculator.clear()
    calculator.displayUI();
})
deleteBtn.addEventListener('click', ()=>{   
    calculator.delete();
    calculator.displayUI()
})

operatorBtns.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.displayUI();
    })
})
equalBtn.addEventListener('click', ()=>{
    calculator.compute();
    calculator.displayUI();
})