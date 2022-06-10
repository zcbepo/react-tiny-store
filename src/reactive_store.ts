import { useReducer, useEffect, DispatchWithoutAction } from 'react';

const isObject = (val: unknown) => val !== null && typeof val === 'object'

function throttle(fn: () => void) {
    let timer: number = 0
    return function () {
        if (timer) {
            cancelAnimationFrame(timer)
        }
        timer = requestAnimationFrame(fn);
    }
}

function createReactiveObject<T extends object>(target: T, callback: DispatchWithoutAction): T {
    const creative = new Proxy(target, {
        get(t, p, r) {
            const ret = Reflect.get(t, p, r) as T
            return isObject(ret) ? createReactiveObject(ret, callback) : ret
        },
        set(t, p, v, r) {
            const old = Reflect.get(t, p, r)
            if (!Object.is(old, v)) {
                Reflect.set(t, p, v, r)
                throttle(callback)()
            }
            return true
        }
    })
    return creative
}

export function createReactiveStore<T extends object>(initial: T) {
    let state = initial
    let dispatchList: Set<DispatchWithoutAction> = new Set()
    const batchUpdate: DispatchWithoutAction = () => {
        dispatchList.forEach(dispatch => dispatch())
    }
    const reactiveState = createReactiveObject(state, batchUpdate)

    return function useStore(key?: string): T {
        const [, update] = useReducer((num: number) => (num + 1) % 1000, 0);
        console.log('run useStore ' + key)
        if (!dispatchList.has(update)) {
            console.log('push update')
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