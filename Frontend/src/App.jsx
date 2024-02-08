import { useState } from 'react'
<<<<<<< HEAD
import viteLogo from '/vite.svg'
=======

>>>>>>> 4b0f4c1738531abd698dfd427b829f55e5a9a2e5
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
