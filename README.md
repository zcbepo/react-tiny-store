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
Using Javascript
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

Using Typescript
```typescript
import { createStore } from 'react-tiny-store'

interface User {
    id: number
    name: string
}

interface UserState {
    userList: User[]
    loading: boolean
}

const useUserStore = createStore<UserState>({ userList: [], loading: false })

// in you React Components
function ComponentA() {
    const [{loading, userList}, setState] = useUserStore()
    useEffect(() => {
        setState({loading: true})
        getUserList()
        .then(list => {
            setState({userList: list})
        })
        .finally(() => {
            setState({loading: false})
        })
    }, [])
    
    if (loading) return <p>loading...</p>
    
    return <ul>
        {userList.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
}
```
