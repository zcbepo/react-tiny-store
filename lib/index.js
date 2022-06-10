'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function createStore(initial) {
    let state = initial;
    let dispatchList = new Set();
    const setState = s => {
        state = { ...state, ...s };
        dispatchList.forEach(dispatch => dispatch(state));
    };
    return function useStore() {
        const [s, d] = react.useState(state);
        if (!dispatchList.has(d)) {
            dispatchList.add(d);
        }
        react.useEffect(() => {
            return () => {
                dispatchList.delete(d);
            };
        }, []);
        return [s, setState];
    };
}

const isObject = (val) => val !== null && typeof val === 'object';
function throttle(fn) {
    let timer = 0;
    return function () {
        if (timer) {
            cancelAnimationFrame(timer);
        }
        timer = requestAnimationFrame(fn);
    };
}
function createReactiveObject(target, callback) {
    const creative = new Proxy(target, {
        get(t, p, r) {
            const ret = Reflect.get(t, p, r);
            return isObject(ret) ? createReactiveObject(ret, callback) : ret;
        },
        set(t, p, v, r) {
            const old = Reflect.get(t, p, r);
            if (!Object.is(old, v)) {
                Reflect.set(t, p, v, r);
                throttle(callback)();
            }
            return true;
        }
    });
    return creative;
}
function createReactiveStore(initial) {
    let state = initial;
    let dispatchList = new Set();
    const batchUpdate = () => {
        dispatchList.forEach(dispatch => dispatch());
    };
    const reactiveState = createReactiveObject(state, batchUpdate);
    return function useStore(key) {
        const [, update] = react.useReducer((num) => (num + 1) % 1000, 0);
        console.log('run useStore ' + key);
        if (!dispatchList.has(update)) {
            console.log('push update');
            dispatchList.add(update);
        }
        react.useEffect(() => {
            return () => {
                dispatchList.delete(update);
            };
        }, []);
        return reactiveState;
    };
}

exports.createReactiveStore = createReactiveStore;
exports.createStore = createStore;
