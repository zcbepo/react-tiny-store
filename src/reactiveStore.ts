import { DispatchWithoutAction } from 'react';
import { createReactiveObject, debounce, useUnmount, useUpdate } from './utils';

export function createReactiveStore<T extends object>(initial: T) {
    let state = initial
    let dispatchList: Set<DispatchWithoutAction> = new Set()
    const batchUpdate: DispatchWithoutAction = () => {
        dispatchList.forEach(dispatch => dispatch())
    }
    const reactiveState = createReactiveObject(state, debounce(batchUpdate))

    return function useStore(): T {
        const update = useUpdate()
        if (!dispatchList.has(update)) {
            dispatchList.add(update);
        }

        useUnmount(() => dispatchList.delete(update))

        return reactiveState;
    }
}