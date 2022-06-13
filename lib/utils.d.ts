import { DispatchWithoutAction } from "react";
export declare const isObject: (val: unknown) => boolean;
export declare function throttle(fn: () => void): () => void;
export declare function createReactiveObject<T extends object>(target: T, callback: DispatchWithoutAction): T;
export declare function useUpdate(): DispatchWithoutAction;
