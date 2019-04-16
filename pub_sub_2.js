
var EventEmitter =  require('events');

var myPub = new EventEmitter();
myPub.on('update', (update) => {
    console.log('first receiver update received', update);
});


myPub.on('update', (update) => {
    console.log('second receiver update received', update);
});


// subscriptionList = {
//     'update': [callback1, callback2]
// }


// myPub.emit('update', 'Update 1');


// subscription List  
// { 
//     [key: eventname or topic] : [Value: collection of callbacks]
// }

// methods
// on (eventName, callback)
// register a subcriber

// emit('eventNaeme', args)


function PubSub() {
    this.subsctibers = {};

    this.subscribe = function (eventName, callback) {
        if (!this.subsctibers[eventName]) {
            this.subsctibers[eventName] = [];
        }

        this.subsctibers[eventName].push(callback);
    }   

    this.publish= function (eventName, arg) {
        if (!this.subsctibers[eventName]) { 
            return;
        }

        this.subsctibers[eventName].forEach(callback => {
            callback(arg);
        });
        
    }
}

const myFeed = new PubSub();
myFeed.subscribe('new_article', (article) => {
    console.log('new article added', article);
});


myFeed.publish('new_article', 'Pub Sub Tutorial');




