'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function createStore(initial) {
    let state = initial;
    let dispatchList = [];
    const setState = s => {
        state = { ...state, ...s };
        dispatchList.forEach(dispatch => dispatch(state));
    };
    return function useStore() {
        const [s, d] = react.useState(state);
        react.useEffect(() => {
            dispatchList.push(d);
            return () => {
                dispatchList = dispatchList.filter(setter => setter !== d);
            };
        }, []);
        return [s, setState];
    };
}

exports.createStore = createStore;
