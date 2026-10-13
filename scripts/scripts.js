const entree = document.querySelector("#entree")
const numberbutton = document.querySelectorAll('[id^="number"]'); //all the numbers
const operatorbutton = document.querySelectorAll("#division, #multiplication, #subtration, #sum");
const clearbutton = document.querySelector("#clear");
const egualbutton= document.querySelector("#egual");

let firstnumber = "";
let secondnumber = "";
let operator = null;
let clearentree = false; 

const operators = {
    sum: "+",
    subtration: "-",      
    multiplication: "*",
    division: "/"
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "Diviser par zéro ? Bien essayé !";
    return a / b;
};


//fonctions d'opération
function operate(a, b, op){
    if (op === "+") return add(a, b);
    if (op === "-") return subtract(a, b);
    if (op === "*") return multiply(a, b);
    if (op === "/") return divide(a, b);
}

// Ajoute le chiffre cliqué au visor 
function typeNumber(number){
    if (clearentree){ 
        entree.value = "";
        clearentree = false;
    }  
    entree.value = entree.value + number;
}

//effectue l'opération en attente et arrondit le résultat
function calculate(){
    secondnumber = entree.value;
    const result = operate(Number(firstnumber), Number(secondnumber), operator);

    if (typeof result === "string"){    
        entree.value = result;
        firstnumber = "";
        operator = null;
        clearentree = true;
        return;
    }

    const rounded = Math.round(result * 1000) / 1000;   
    entree.value = rounded;
    firstnumber = String(rounded);   
}

//memorise l'operateur choisi et calcule l'opération précédente s'il y en a une.
function chooseOp(newOp){
    if (clearentree){
        operator = newOp; // 
        return;
    }
    if (operator !== null){ 
        calculate();
    } else{ 
        firstnumber = entree.value ;
    }
    operator = newOp;     
    clearentree = true;         
}

// Affiche le résultat final lorsqu'on appuie sur =
function afficherResultat(){
    if (operator === null) return;   
    if (clearentree) return;        
    calculate();
    operator = null;                
    clearentree = true;
}

//réinitialise complètement la calculatrice
function clearAll(){
    entree.value = "";
    firstnumber = "";
    secondnumber = "";
    operator = null;
    clearentree = false;
}

//button operations

operatorbutton.forEach(function (button) {
    button.addEventListener("click", function () {
        chooseOp(operators[button.id]);
    });
});

numberbutton.forEach(function(button){
    button.addEventListener("click", function(){
        typeNumber(button.textContent)
    }); });

clearbutton.addEventListener("click", clearAll);
egualbutton.addEventListener("click", afficherResultat);