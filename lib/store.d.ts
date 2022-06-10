export declare type SetStateFuncion<T> = (s: Partial<T>) => void;
export declare function createStore<T>(initial: T): () => [T, SetStateFuncion<T>];
