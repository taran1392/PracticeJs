

mObservable = require('./observable');

 const obs =new mObservable((observer) => {
    var count =0 ;
  var interval =  setInterval(() => {
      if(count >3) {
          subscription.unsubscribe();
      }
       if(count >= 5) 
          {
              observer.complete();
              clearInterval(interval);
              return;
          } 
       observer.next(count++);
       
  }, 1000)
});


const subscription = obs.subscribe(val => {
    console.log('Observable value emitted', val);
}, err => {}, complete => {

   console.log('Observable complete');
});

