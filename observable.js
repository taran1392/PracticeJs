

/**
 * observable implementation
 * 
 * specification: https://github.com/tc39/proposal-observable
 */


 class mObservable {

    constructor(subscriberFunction) {
        this._subscriberFunction = subscriberFunction;
        this.observers = [];

    }

    subscribe(onNext, onError, onComplete) {
        const observer = {
            onNext, onError, onComplete
        }

        this.observers.push(observer);
        if(this.observers.length === 1)
            this._execute();

        return {
            unsubscribe:  () => {
               this.observers = this.observers.filter(obs => obs !== observer);
            }
        }

    }

    _execute() {
        this._subscriberFunction(this.getObserver())
    }

     onNext(value) {
        this.observers.forEach(observer => {
            if(observer.onNext && typeof (observer.onNext) === 'function') {
                observer.onNext(value);
            }
        })

    }

    

    onError() {

    }

    onComplete() {
        
        this.observers.forEach(observer => {
            if(observer.onNext && typeof (observer.onComplete) === 'function') {
                observer.onComplete();
            }
        })

    }

    getObserver () {
        return {
            next: this.onNext.bind(this),
            error:this.onError.bind(this),
            complete: this.onComplete.bind(this)
        }
    }
 }


 module.exports = mObservable;



