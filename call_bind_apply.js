// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
// implement method contains in araay to check if array contains that element.

Array.prototype.contains = function (element) {
  console.log(this);
  return this.indexOf(element) >= 0
}

var array = ["1", "hello", "there", "world"];

console.log(array.contains("hello"))  //return true
console.log(array.contains("asda"))  // false



/**
 * string
 * number
 * bigint
 * undefined
 * null
 * symbol
 * boolean
 * 
 * Object
 */



Function.prototype.myBind = function(thisArg) {
   var self = this // fucntion on which we have to apply bind
  return function () {
   var args = Array.from(arguments);
   return self.call(thisArg, ...args);
  }
}


Function.prototype.myCall = function (thisArg) {
   var self = this // fucntion on which we have to apply bind
   var args = Array.from(arguments);
   console.log("My call args", args);
    thisArg["__myBingfunc"]= self;
    var retVal= thisArg["__myBingfunc"](...args.slice(1));
    delete thisArg["__myBingfunc"];
    return retVal;
  
}


Function.prototype.myApply = function (thisArg, functionArgs) {
   var self = this // fucntion on which we have to apply bind
  var fname = "__myApply__"
    thisArg[fname]= self;
    var retVal= thisArg[fname](...functionArgs);
    delete thisArg[fname];
    return retVal;
  
}

function hello( greet) {
  console.log(`Hi  ${greet}`, this.name);
  return "hello was called";
}
function getGreet() {
  return `Hi there, ${this.name}`
}
var obj = {name: "Taran"};

var f = hello.myBind(obj);
f("good morning");
console.log( "My Call execution", hello.myApply(obj, ["My call", "var 2", "var 3"]));



