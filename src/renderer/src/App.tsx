import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Npc from './pages/Npc'
import Settings from './pages/Settings'
import EditNpc from './pages/Edit'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/npc/:id" element={<Npc />} />
        <Route path="/edit/:id" element={<EditNpc />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
