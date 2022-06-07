import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function createStore<T>(initial: T) {
  let state = initial
  let dispatchList: Dispatch<SetStateAction<T>>[] = []
  const setState = (s: Pick<T, any>) => {
    state = {...state, ...s}
    dispatchList.forEach(dispatch => dispatch(state))
  }

  return function useStore(): [T, (s: Pick<T, any>) => void] {
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