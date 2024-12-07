import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const count = useSelector((state:RootState) => state.counter)
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>My current count = 0</h1>My current count = {count.value}
      </div>
      <div>
        <button>Increase +1</button>
      </div>
    </>
  )
}

export default App
