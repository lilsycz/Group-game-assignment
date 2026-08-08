import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Game from './components/Game'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login temporarily hidden — open directly into the game */}
        <Route path="/" element={<Game />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App