//Loops

//for loop
for(let i = 0; i < 5; i++){
    console.log("Hello World!")
}

var cars = ["Volvo", "Toyota", "Tesla"]
// for of loop
for(let car of cars){
    console.log(car)
    if(car == "Toyota"){
        break
    }
}

//ES6 syntax for each loop
cars.forEach(car => {
    console.log(car)
})