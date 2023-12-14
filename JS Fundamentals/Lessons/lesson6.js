//Conditional statement


//If hour between 6 and 12, print "Good Morning"
//If hour between 12 and 18, print "Good Afternoon"
//Otherwise print "Good Evening"

var hour = 13
if(hour >= 6 && hour < 12){
    console.log("Good Morning")
} else if(hour >= 12 && hour < 18){
    console.log("Good Afternoon")
} else{
    console.log("Good Evening")
}

var ageIsMoreThanEighteen = true
var isUSCitizen = true
var eligibilityForDriversLicense = ageIsMoreThanEighteen || isUSCitizen

if(ageIsMoreThanEighteen && isUSCitizen){
    console.log(`Customer is eligible for DL`)
} else {
    console.log('Customer is NOT eligible for DL')
}