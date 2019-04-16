function PubSub() {
    var subscribers = {};

    this.on = function(eventName, callback) {
        if (! (eventName in subscribers)) {
            subscribers[eventName] = [];
        }
        subscribers[eventName].push(callback);
    }

    this.emit = function(eventName, value) {
        if (!(eventName in subscribers))
            return;
        subscribers[eventName].forEach(callback => {
             callback(value);   
        });
    }
    
}
var loginStatus = new PubSub();
loginStatus.on('loggedIn', function(value) {
    console.log('User Logged In...', value);
});
loginStatus.on('loggedOut', function(value) {
    console.log('user Logged Out', value);
});
setTimeout(function() {
    loginStatus.emit('loggedIn', 'USER_XYZ');
}, 1000);
setTimeout(function() {
    loginStatus.emit('loggedOut', 'USER_XYZ');
}, 2000);