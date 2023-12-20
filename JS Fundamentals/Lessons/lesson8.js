// Declaritive function - can be called before it is defined
function helloOne(){
    console.log("Hello one!")
}

helloOne()

// Anonymous function - cannot be called before it is defined
var helloTwo = function(){
    console.log("Hello two!")
}

helloTwo()

//ES6 function or arrow function
var helloThree = () => {
    console.log("Hello three!")
}

helloThree()

//Function with arguments
function printName(name, lastName){
    console.log(name + " " + lastName)
}

printName("John", "Smith")

//Function with return
function multiplyByTwo(number){
    var result = number * 2
    return result
}

var myResult = multiplyByTwo(5)
console.log(myResult)

//import function
import {printAge} from "../Helpers/printHelper.js"
printAge(25)

//import everything 
import * as helper from "../Helpers/printHelper.js"
helper.printAge(25)