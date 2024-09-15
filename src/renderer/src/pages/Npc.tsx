import Layout from '@renderer/layout/Layout'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { NpcType } from '@renderer/types/npc'
import { ArrowLeft, FileX as Delete, FilePenLine as Edit } from 'lucide-react'

const NpcPage: React.FC = () => {
  const navigate = useNavigate()
  const id = useParams<{ id: string }>().id
  const [npc, setNpc] = useState<NpcType | null>(null)
  useEffect(() => {
    const fetchNpc = async (): Promise<NpcType | null> => {
      if (id) {
        const npc = await window.api.getNpcById(Number(id))
        return npc
      }
      return null
    }
    fetchNpc().then((npcresponse) => setNpc(npcresponse))
  }, [id])

  function handleDelete(): void {
    if (npc?.id) {
      window.api.deleteNpc(npc.id)
      navigate('/')
    }
  }

  return (
    <Layout>
      <div className="w-full h-full px-16 py-12 ">
        <div className="relative w-full h-fit text-zinc-900 dark:text-zinc-500 bg-zinc-300 dark:bg-zinc-900 rounded-md flex flex-col p-12 gap-4">
          <Link
            to="/"
            className="absolute left-4 top-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <ArrowLeft />
          </Link>
          <div className="absolute flex items-center gap-2 top-4 right-4 text-zinc-600 dark:text-zinc-300 ">
            <Link
              to={`/edit/${id}`}
              className=" flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition "
            >
              <Edit />
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
            >
              <Delete />
            </button>
          </div>

          <div className="flex gap-10 w-full h-fit">
            <div className="rounded-md hover:z-10 z-20 w-48 h-48 overflow-hidden flex items-center justify-center">
              <img src={npc?.imagePath} alt="npc" className="object-cover" />
            </div>
            <div className="flex gap-80 py-6">
              <div className="flex flex-col font-semibold  text-zinc-800 dark:text-zinc-200 gap-4">
                <div className="relative flex  gap-1">
                  <span className="text-zinc-500">Nome:</span>
                  <span className="font-medium">{npc?.name}</span>
                </div>
                <div className="relative flex  gap-1">
                  <span className="text-zinc-500">Idade:</span>
                  <span className="font-medium">{npc?.age}</span>
                </div>
              </div>
              <div className="flex font-semibold text-zinc-800 flex-col dark:text-zinc-200  gap-4">
                <div className="flex gap-1 justify-end items-center">
                  <span className="text-zinc-500">Raça:</span>
                  <span className="font-medium">{npc?.race}</span>
                </div>
                <div className="flex gap-1 justify-end items-center">
                  <span className="text-zinc-500">Classe:</span>
                  <span className="font-medium">{npc?.class}</span>
                </div>
                <div className="flex gap-1 justify-end items-center">
                  <span className="text-zinc-500">Gênero:</span>
                  <span className="font-medium">{npc?.gender}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex relative flex-col font-semibold text-zinc-800 dark:text-zinc-200 gap-1">
            <span className="text-zinc-600">Descrição:</span>
            <div className="text-sm w-full font-light">
              <p>{npc?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NpcPage
