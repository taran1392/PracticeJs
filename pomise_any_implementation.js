
const timer = function (delay, value) {
  return new Promise(res => {
      setTimeout(()=> {res(value)}, delay)
  });
}


var mPromises = [timer(10, 'After 7 second'), timer(2000, 'After 2 second'), timer(10, 'After 1 second'), timer(5000, 'After 5 second')]


function any (promises) {
  return new Promise ((resolve, reject) => {
    promises.forEach(p => {
      p.then(val => resolve(val)).catch(err => reject(err))
    })
  })
}


any(mPromises).then(val => {
  //alert(val);
  appDiv.innerHTML = val;
})
