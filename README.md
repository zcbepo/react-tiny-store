An easier way to share state between React Components

## Installing
Using npm:
```bash
npm install react-tiny-store
```

Using yarn:
```bash
yarn add react-tiny-store
```

## Example
```javascript
import { createStore } from 'react-tiny-store'
const useCounterStore = createStore({count: 1})

// in you React Components
function ComponentA() {
    const [state] = useCounterStore()
    return <div>{`double: ${state.count * 2}`}</div>
}

function ComponentB() {
    const [state, set] = useCounterStore()
    return <>
        <button
            onClick={() => set({ count: state.count + 1 })}
        >
        {`count: ${state.count}`}</button>
    </>
}
```