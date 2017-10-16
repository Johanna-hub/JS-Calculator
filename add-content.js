//String of all the numbers being inputted
var sum = "";
//Calculator display of numbers being inputted
var final = document.getElementById("input");

//Number buttons - display number pressed on calculator display and add them to string sum, (also includes minus sign)
var button = document.getElementsByClassName("number-key");
var keys = [];
  for (var i = 0; i < button.length; i++){
    keys.push(button[i].textContent);
  }
  for (var j = 0; j < keys.length; j++){
    let keysTwo = keys[j]
    button[j].addEventListener("click", function(){
      final.insertAdjacentHTML('beforeend', keysTwo.trim())}, false);
    button[j].addEventListener("click", function(){
      sum+=keysTwo.trim()}, false);
  }

//operator buttons - only allowed to be used if there is a digit beforehand and cannot be used in a row
var operator = document.getElementsByClassName("function-key");
var oKeys = [];
  for (var k = 0; k < operator.length; k++){
    oKeys.push(operator[k].textContent);
   }
  for (var l = 0; l < oKeys.length; l++){
    let oKeysTwo = oKeys[l]
    operator[l].addEventListener("click", function(){
      var lastLastChar = sum.charAt(sum.length-1);
      if(lastLastChar.match(/[^\=\+\*\\\\\-\s\.]/)){
        final.insertAdjacentHTML('beforeend', oKeysTwo.trim())
      }
    }, false);
    operator[l].addEventListener("click", function(){
      var lastChar = sum.charAt(sum.length-1);
      if(lastChar.match(/[^\=\+\*\\\\\-\s\.]/)){
        sum+=oKeysTwo.trim()
      }
    }, false );
   }

/*subtraction button - can be used before number to make a negative number
   var subtract = document.getElementById("minus");
   subtract.addEventListener("click", function(){sum+="-"}, false);
   subtract.addEventListener("click", function(){final.insertAdjacentHTML('beforeend', "-")}, false)*/

//decimal point button - can not be input repeatedly, however can be used without 0 in front if that is user preference
var decimal = document.getElementById(".");
decimal.addEventListener("click", function(){
  //allow . to be input as first character
  if (sum.length===0){
    final.insertAdjacentHTML('beforeend', ".");
  //allow . to be put in first time
  } else if(sum.match(/^\d+$/)){
    final.insertAdjacentHTML('beforeend', ".");
  //allow . to be put in after subsequent operations and whole numbers
  } else if (sum.match(/([\+\*\\\\\-]\d*)$/)){
    final.insertAdjacentHTML('beforeend', ".");
  }
}, false)

decimal.addEventListener("click", function(){
  console.log("sum2 =" + sum);
  if (sum.length===0){
    sum+=".";
  } else if (sum.match(/^\d+$/)){
    sum+=".";
  } else if (sum.match(/([\+\*\\\\\-]\d*)$/)){
    sum+="."
  }
}, false);

//Display the result on calculator
  var equation = document.getElementById("equals");
  equation.addEventListener("click", function(){final.innerHTML = equals(sum)}, false);

//Button to clear display
  var clear = document.getElementById("clear-button");
  clear.addEventListener("click", function(){final.innerHTML=""}, false);
  clear.addEventListener("click", function(){sum=""}, false);

//Function to work out result
function equals(sum){
  var result = 0;
  var final = [];
  //Need to add in the 0 before deminal point if the user didn't do it or treats as whole number
  var addZeroes = sum.replace(/([\+\-\*\\\\](?=\.))/g, "$&0");
  addZeroes = addZeroes.replace(/^\./, "0.")
  var numbers = addZeroes.match(/\d+\.\d+|\d+/g);
  //Use regex to find decimal numbers or whole numbers and push to new array
  for (var i = 0; i< numbers.length; i++){
    if(numbers[i].match(/\./)){
      final.push(parseFloat(numbers[i]));
    } else {
      final.push(parseInt(numbers[i]));
    }
  }
  //Use regex to find first operation
  var operators = sum.match(/[+\*\-\/]/g);
      if(operators[0]==="+"){
      result = (final[0]) + (final[1]);
  }   else if (operators[0]==="-"){
      result = (final[0]) - (final[1]);
  }   else if (operators[0]==="*"){
      result = (final[0]) * (final[1]);
  }   else if (operators[0]==="/"){
      result = (final[0]) / (final[1]);
  }
  //Loop through rest of input string to work out the rest of the sum
  for(var j = 2; j < final.length; j++){
    if(operators[j-1]==="+"){
      result += (final[j]);
    } else if (operators[j-1]==="-"){
      result -= (final[j]);
    } else if (operators[j-1]==="*"){
      result *= (final[j]);
    } else if (operators[j-1]==="/"){
      result /= (final[j]);
    }
  }
   //round to decimal point
   var endResult = Number(result.toFixed(10));
   //if division by 0, return Error instead of infinity
   if(endResult===Infinity){
     return "Error";
   }
   return endResult;
}
