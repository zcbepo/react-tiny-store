import { useRef } from "react";
import { createReactiveObject, debounce, useUpdate } from "./utils";

type Wrapped<T> = { value: T }
function wrap<T>(raw: T): Wrapped<T> {
    return { value: raw }
}

export function useReactive<S extends object>(state: S) {
    const update = useUpdate()
    const reactive = useRef(createReactiveObject(state, debounce(update)))
    return reactive.current
}

export function useBaseReactive<S>(state: S) {
    const update = useUpdate()
    const reactiveState = useRef(createReactiveObject(wrap<typeof state>(state), debounce(update)))
    return reactiveState.current
}