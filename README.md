
# use-awaitable-component

React hook for awaiting a component's callback.
## Usage
```jsx
const Example = () => {
  const [awaitLoginStatus, handleAwaitLogin, handleAwaitLoginResolved, handleAwaitLoginRejected, handleAwaitLoginReset] = useAwaitableComponent()

  const handleLogin = async () => {
    try {
      const res = await handleAwaitLogin()
      console.log("LOGIN SUCCESS: ", res);
    } catch (err) {
      console.log("LOGIN ERROR: ", err);
    } finally {
      handleAwaitLoginReset()
    }
  }
  return (
    <>
      <Button
        onClick={handleLogin}
        loading={awaitLoginStatus === 'awaiting'}
      >
        LOGIN
      </Button>
      <ExampleLoginModal
        visible={awaitLoginStatus === 'awaiting'}
        afterLoginSucceeded={handleAwaitLoginResolved}
        afterLoginFailed={handleAwaitLoginRejected}
        onCancel={handleAwaitLoginReset}
      />
    </>
  )
}
```

## Reference
```jsx
const [status, execute, resolve, reject, reset] = useAwaitableComponent()
```
| Field | Type | Descriptions |
|--|--|--|
| `status` | `'idle' | 'awaiting' | 'resolved' | 'rejected'` | Current awaitable component status |
| `execute` | `() => Promise` | A function to start execution |
| `resolve` | `(data: any) => void` | A callback to call after component completed without error |
| `reject` | `(reason: any) => void` | A callback to call after component completed with error |
| `reset` | `() => void` | A function to reset status back to `idle`. This function must be called before calling `execute()` again. |
