An easier way to share state between React Components

## Installing
Using npm:
```bash
npm install react-tiny-store --save
```

Using yarn:
```bash
yarn add react-tiny-store --save
```

## Example

### Store
```javascript
import { createStore } from 'react-tiny-store'

const useCounterStore = createStore({count: 1, base: 0})

function Component() {
    const [state, setState] = useCounterStore()
    return (
        <button
            onClick={() => setState({ count: state.count + 1 })} // you can only set partial state
        >{`count: ${state.base + state.count}`}</button>
    )
}
```
### Reactive Store
```javascript
import { createReactiveStore } from "react-tiny-store"

const useReactiveStore = createReactiveStore({
    counter: {
        count: 1 
    } 
})

function Component() {
    const state = useReactiveStore()
    return (
        <button 
            onClick={() => state.counter.count ++}
            >{`count: ${state.counter.count}`}</button>
    )
}
```

### useReactive
```javascript
import { useReactive } from "react-tiny-store"

function Component() {
    const state = useReactive({
        counter: {
            count: 1
        }
    })
    return (
        <button 
            onClick={() => state.counter.count ++}
            >{`count: ${state.counter.count}`}</button>
    )
}
```
