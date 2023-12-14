// Logical "AND"
console.log(true && true) // all values have to be true for expression to be true

// Logical "OR"
console.log(true || false) // any value should be true for the expression to be true

var ageIsMoreThanEighteen = true
var isUSCitizen = false

var eligibilityForDriversLicense = ageIsMoreThanEighteen || isUSCitizen
console.log(`This customer is eligible for DL: ${eligibilityForDriversLicense}`)

//Logical "NOT" operator
console.log(!true)