

# use-awaitable-component

React hook for awaiting component callback.

## Installation
**npm**
```
npm install use-awaitable-component
```
**yarn**
```
yarn add use-awaitable-component
```

## Usage
```jsx
import { useState } from "react";
import useAwaitableComponent from "use-awaitable-component";
import "./styles.css";

function Modal({ visible, onSubmit, onCancel }) {
  const [text, setText] = useState("");
  const display = visible ? "block" : "none";

  const handleSubmit = () => {
    onSubmit(text);
    setText("");
  };

  const handleCancel = () => {
    onCancel(":)");
  };

  return (
    <div className="modal" style={{ display }}>
      <div className="modal-head">This is a modal</div>
      <div className="modal-body">
        <input
          placeholder="Type something here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <button className="modal-close" onClick={handleCancel}>
        X
      </button>
    </div>
  );
}

export default function App() {
  const [status, execute, resolve, reject, reset] = useAwaitableComponent();
  const showModal = status === "awaiting";

  const handleAwaitModal = async () => {
    try {
      const value = await execute();
      alert(`VALUE: ${value}`);
    } catch (err) {
      alert(`Canceled: ${err}`);
    } finally {
      reset();
    }
  };
  return (
    <div className="App">
      <div className="button-container">
        <button disabled={showModal} onClick={handleAwaitModal}>
          {showModal ? "Waiting..." : "Show Modal"}
        </button>
      </div>
      <Modal visible={showModal} onSubmit={resolve} onCancel={reject} />
    </div>
  );
}
```

## Live Demo
See live demo on [Codesandbox](https://codesandbox.io/s/use-awaitable-component-demo-kok6g).

## Reference
```jsx
const [status, execute, resolve, reject, reset] = useAwaitableComponent()
```
| Field | Type | Descriptions |
|--|--|--|
| `status` | `'idle' \| 'awaiting' \| 'resolved' \| 'rejected'` | Current awaitable component status |
| `execute` | `() => Promise` | A function to start execution |
| `resolve` | `(data: any) => void` | A callback to call after component completed without error |
| `reject` | `(reason: any) => void` | A callback to call after component completed with error |
| `reset` | `() => void` | A function to reset status back to `idle`. This function must be called before calling `execute()` again. |
