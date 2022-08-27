var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
const numbers=document.querySelectorAll('[data-number]');
const operation=document.querySelectorAll('[data-operation]');
const delBtn=document.querySelector('[data-delete]');
const allClearBtn=document.querySelector('[data-all-clear]');
const equalsBtn=document.querySelector('[data-equals]');
//these are the divs used for appending numbers
const prevOperandTextElement=document.querySelector('[data-previous-operand]');
const currOperandTextElement=document.querySelector('[data-current-operand]');

class Calculator{
    constructor(prevOperandTextElement,currOperandTextElement){
        this.prevOperandTextElement=prevOperandTextElement;
        this.currOperandTextElement=currOperandTextElement;
        this.clear();
    }
    clear(){
        //these below variables are to be used for function purposes
        
        this.currOp='';
        this.prevOp='';
        this.operation=undefined;
    }
    appendNumber(number){
        //if '.' is present once you don't need other
        if(number==='.'&& this.currOp.includes('.')){
            return;
        }
        //iss variable ko use kro for appending by func
        this.currOp=this.currOp.toString()+number.toString();
    }
    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0]);
        const decimalDigits=stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay ='';
        }
    else{
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits:0
        })
        }
        if(decimalDigits !=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay;
        }
    }
    
    updateDisplay(){
        //selected div
       this.currOperandTextElement.innerText=this.getDisplayNumber(this.currOp);
       if(this.operation!=null){
        this.prevOperandTextElement.innerText=`${this.prevOp} ${this.operation}`;
       }
       else{
        this.prevOperandTextElement.innerText='';
       } 
    }
    delete(){
        this.currOp=this.currOp.slice(0,-1);
        
    }  
    chooseOperation(operation){
        if(this.currOp===''){
            return;
        }
        if(this.prevOp!==''){
            this.compute();
        }
            this.operation=operation;
            this.prevOp=this.currOp;
            this.currOp='';
        
    }
    compute(){
        let computation;
        const prev=parseFloat(this.prevOp);
        const current=parseFloat(this.currOp);
        if(isNaN(prev)||isNaN(current)){
            return;
        }
            switch(this.operation){
                case '+':
                    computation=prev+current;
                    break;
                case '-':
                    computation=prev-current;
                    break;
                case '*':
                    computation=prev*current;
                    break;
                case '/':
                    computation=prev/current;
                    break;
                default:
                    return;
            }
            this.currOp=computation;
            this.operation=undefined;
            this.prevOp='';
        }
    }                                         //created variable for operations


//object creation for storing reset values
const Calc=new Calculator(prevOperandTextElement,currOperandTextElement);

// let numBtns=document.querySelectorAll('.button');
Array.from(numbers).forEach((button)=>{
    button.addEventListener("click",() => {
        Calc.appendNumber(button.innerText);
        Calc.updateDisplay();
        
    })
})
delBtn.addEventListener("click",() => {
    Calc.delete();
    Calc.updateDisplay();
})
Array.from(operation).forEach((button)=>{
    button.addEventListener("click",() => {
        Calc.chooseOperation(button.innerText);
        Calc.updateDisplay();
        
    })
})
equalsBtn.addEventListener("click",() => {
    Calc.compute();
    Calc.updateDisplay();
})
allClearBtn.addEventListener("click",() => {
    Calc.clear();
    Calc.updateDisplay();
})


