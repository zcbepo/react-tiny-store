import { useReducer, useEffect, DispatchWithoutAction } from 'react';
import { createReactiveObject } from './utils';

export function createReactiveStore<T extends object>(initial: T) {
    let state = initial
    let dispatchList: Set<DispatchWithoutAction> = new Set()
    const batchUpdate: DispatchWithoutAction = () => {
        dispatchList.forEach(dispatch => dispatch())
    }
    const reactiveState = createReactiveObject(state, batchUpdate)

    return function useStore(): T {
        const [, update] = useReducer((num: number) => (num + 1) % 1000, 0);
        if (!dispatchList.has(update)) {
            dispatchList.add(update);
        }

        useEffect(() => {
            return () => {
                dispatchList.delete(update)
            }
        }, [])

        return reactiveState;
    }
}