import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Game from './components/Game'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App