export declare function createStore<T>(initial: T): () => [T, (s: Pick<T, any>) => void];
