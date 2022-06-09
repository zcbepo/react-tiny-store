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

exports.createStore = createStore;
