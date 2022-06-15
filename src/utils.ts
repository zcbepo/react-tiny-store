import { DispatchWithoutAction, useEffect, useReducer } from "react";

export const isObject = (val: unknown) => val !== null && typeof val === 'object'

export function debounce(fn: () => void) {
    let timer: number = 0
    return function () {
        if (timer) {
            cancelAnimationFrame(timer)
        }
        timer = requestAnimationFrame(fn);
    }
}

export function createReactiveObject<T extends object>(target: T, callback: DispatchWithoutAction): T {
    const creative = new Proxy(target, {
        get(t, p, r) {
            const ret = Reflect.get(t, p, r) as T
            return isObject(ret) ? createReactiveObject(ret, callback) : ret
        },
        set(t, p, v, r) {
            const old = Reflect.get(t, p, r)
            if (!Object.is(old, v)) {
                Reflect.set(t, p, v, r)
                callback()
            }
            return true
        }
    })
    return creative
}

export function useUpdate() {
    const [, update] = useReducer((num: number) => (num + 1) % 1000, 0);
    return update
}

export function useUnmount(cb: () => void) {
    useEffect(() => cb, [])
}