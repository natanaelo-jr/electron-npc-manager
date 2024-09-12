import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home: React.FC = () => {
  useEffect(() => {
    const fetchNpcs = async (): Promise<void> => {
      const npc = await window.api.getNpcById(1)
      console.log(npc)
    }
    fetchNpcs()
  }, [])

  return (
    <div className="w-full h-full bg-zinc-300">
      <Link to="/register">Registro</Link>
    </div>
  )
}

export default Home
