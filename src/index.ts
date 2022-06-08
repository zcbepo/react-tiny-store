import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export type SetStateFuncion<T> = (s: Partial<T>) => void

export function createStore<T>(initial: T) {
  let state = initial
  let dispatchList: Dispatch<SetStateAction<T>>[] = []
  const setState: SetStateFuncion<T> = s => {
    state = {...state, ...s}
    dispatchList.forEach(dispatch => dispatch(state))
  }

  return function useStore(): [T, SetStateFuncion<T>] {
    const [s, d] = useState(state);
    
    useEffect(() => {
      dispatchList.push(d);
      return () => {
        dispatchList = dispatchList.filter(setter => setter !== d)
      }
    }, [])

    return [s, setState];
  }
}