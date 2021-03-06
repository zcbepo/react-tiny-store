import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useUnmount } from './utils';

export type SetStateFuncion<T> = (s: Partial<T>) => void

export function createStore<T>(initial: T) {
    let state = initial
    let dispatchList: Set<Dispatch<SetStateAction<T>>> = new Set()
    const setState: SetStateFuncion<T> = s => {
        state = { ...state, ...s }
        dispatchList.forEach(dispatch => dispatch(state))
    }

    return function useStore(): [T, SetStateFuncion<T>] {
        const [s, d] = useState(state);
        if (!dispatchList.has(d)) {
            dispatchList.add(d);
        }

        useUnmount(() => dispatchList.delete(d))

        return [s, setState];
    }
}