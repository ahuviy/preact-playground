
export function BehaviorSubject(initialValue, isAsync) {
    let _observers = [];
    let _value = initialValue;
    let _isAsync = isAsync;

    const getValue = function () {
        return _value;
    }

    const subscribe = function (onNext, onError, onComplete) {
        const observer = new Observer(onNext, onError, onComplete, _isAsync);
        _observers.push(observer);
        onNext(_value);
        return new Subscription(observer);
    }

    const next = function (value) {
        _value = value;
        _observers = _observers.filter(o => !o.isUnsubscribed);
        _observers.forEach(o => o.onNext(value));
    }

    const complete = function () {
        _observers.forEach(o => {
            if (!o.isUnsubscribed) {
                o.onComplete();
                o.isUnsubscribed = true;
            }
        });
        _observers = [];
    }

    const error = function (err) {
        _observers.forEach(o => {
            if (!o.isUnsubscribed) {
                o.onError(err);
                o.isUnsubscribed = true;
            }
        });
        _observers = [];
    }

    return { next, error, complete, subscribe, getValue };
}

export function Subject(isAsync) {
    let _observers = [];
    const _isAsync = isAsync;

    const subscribe = function (onNext, onError, onComplete) {
        const observer = new Observer(onNext, onError, onComplete, _isAsync);
        _observers.push(observer);
        return new Subscription(observer);
    };

    const next = function (value) {
        _observers = _observers.filter(o => !o.isUnsubscribed);
        _observers.forEach(o => o.onNext(value));
    };

    const complete = function () {
        _observers.forEach(o => {
            if (!o.isUnsubscribed) {
                o.onComplete();
                o.isUnsubscribed = true;
            }
        });
        _observers = [];
    };

    const error = function (err) {
        _observers.forEach(o => {
            if (!o.isUnsubscribed) {
                o.onError(err);
                o.isUnsubscribed = true;
            }
        });
        _observers = [];
    };

    return { subscribe, next, complete, error };
}


function Subscription(observer) {
    let _observer = observer;

    const unsubscribe = function () {
        if (!_observer.isUnsubscribed) {
            _observer.isUnsubscribed = true;
            _observer = undefined;
        }
    }

    return { unsubscribe };
}

function Observer(onNext, onError, onComplete, isAsync) {
    let isUnsubscribed = false;

    if (!onNext || typeof onNext !== 'function') {
        onNext = function () { }
    }
    if (!onComplete || typeof onComplete !== 'function') {
        onComplete = function () { }
    }
    if (!onError || typeof onError !== 'function') {
        onError = function () { }
    }
    onNext = isAsync ? setTimeout(onNext) : onNext;
    onComplete = isAsync ? setTimeout(onComplete) : onComplete;
    onError = isAsync ? setTimeout(onError) : onError;

    return { onNext, onComplete, onError, isUnsubscribed };
}
