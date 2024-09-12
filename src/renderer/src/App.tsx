import { useState } from 'react'
import { NpcType } from './types/npc'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App(): JSX.Element {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageBuffer, setImageBuffer] = useState<Buffer | null>(null)

  async function handleAddNpc() {
    const npc: NpcType = {
      name: 'Gorak',
      race: 'Orc',
      age: 30,
      gender: 'Male',
      class: 'Warrior',
      description: 'A fierce warrior.'
    }

    // Chama a função do backend para adicionar o NPC com imagem
    if (imageBuffer) {
      window.api.addNpc(npc, Buffer.from(imageBuffer))
    } else {
      console.error('imageBuffer is null')
      return
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
