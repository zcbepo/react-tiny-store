import { useState } from "react";
import { createReactiveObject, useUpdate } from "./utils";

type Wrapped<T> = { value: T }
function wrap<T>(raw: T): Wrapped<T> {
    return { value: raw }
}

export function useReactive<S extends object>(state: S) {
    const update = useUpdate()
    const [reactiveState] = useState(() => createReactiveObject(state, update))
    return reactiveState
}

export function useBaseReactive<S>(state: S) {
    const update = useUpdate()
    const [reactiveState] = useState(() => createReactiveObject(wrap<typeof state>(state), update))
    return reactiveState
}