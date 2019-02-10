/***
 * Iterators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
 */


 /***
  * Notes
  * for..in 
  *     1. iterates over the enumerable properties . for e.g index in when used with arrays and strings. 
  *     2. in case of objects it iteraties over the enumerable properties
  * for..of
  *     1. iterates over the values of an iterrable object
  *     2. iterable object must implement [Symbo.itertaor] property 
  */

 var obj = {
     [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
     }
 }


 for(let val of obj) {
     console.log(val);
 }


 
 for(let val of obj) {
    console.log(val);
}
