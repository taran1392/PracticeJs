
class mPromise {

    constructor(executor) {
        if (!executor || executor == undefined)
            throw new Error('executor cannot be null');
        if (typeof executor !== 'function')
            throw new Error('exeuctor must be a function');
        this._state = 'pending';
        this._resolvingFunctions = [];
        this._rejectFunctions = [];
        this._result = null;

        this._executor = executor;

        setTimeout(() => {
            try {
                this._executor(this.resolve.bind(this), this.reject.bind(this))
            } catch (err) {
                this.reject(err);
            }

        }, 0);

    }

    get state() {
        return this._state;
    }

    resolve(val) {
        this._state = "completed";
        this._result = val;
        this._resolvingFunctions.forEach(func => {
            func(val);
        });
        this._resolvingFunctions = [];

    }

    reject(err) {
        this._state = "error";
        this._result = err;
        this._rejectFunctions.forEach(func => {
            func(val);
        });
        this._rejectFunctions = [];

    }

    then(onFullFilled, onRejected) {

        return new mPromise((resolve, reject) => {
            if (this.state === 'completed')
                return resolve(onFullFilled(this._result));
            if (this.state === 'error')
                return reject(onRejected(this._result));
            this._resolvingFunctions.push((val) => resolve(onFullFilled(val)));
            this._rejectFunctions.push((err) => reject(onRejected(err)));
        });
    }

    catch(rejectFunction) {
        return new mPromise((resolve, reject) => {
            if (this.state === 'error')
                return reject(rejectFunction(this._result));
            this._rejectFunctions.push((val) => reject(rejectFunction(val)));
        });
    }

}




mPromise.prototype.all = function (values) {

    var remaining = values.length;
    var result = [];
    return new mPromise((resolve, reject) => {

        values.forEach((val, index) => {
            if (typeof val === mPromise) {
                (function (i) {
                    promise.then(val => {
                        result[index]=val
                        remaining--;
                    }).catch(err => reject(err));                    
                })(promise, index);

            } else {
                result[index]= val;
                remaining--;
            }
        })
    });
}

var p = new mPromise((resolve, reject) => {
    console.log('inside promise...');


    resolve('hello');

    // resolve('hellow');
});

var p2 = new mPromise((resolve, reject) => {
    console.log('inside promise 2...');
    setTimeout(() =>  resolve('hello 2'), 2000);
   

    // resolve('hellow');
});

p.then(val => {
    console.log('value from promise..', val);
    return val;
}).then(val => {
    console.log('second then', val);
}).catch(err => {
    console.log(" promise failed error");
});


Promise.all([p,p2]).then(values=> {
    console.log(values);
})