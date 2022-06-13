declare type Wrapped<T> = {
    value: T;
};
export declare function useReactive<S extends object>(state: S): S;
export declare function useBaseReactive<S>(state: S): Wrapped<S>;
export {};
