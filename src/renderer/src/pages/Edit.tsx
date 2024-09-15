import Layout from '@renderer/layout/Layout'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { NpcType } from '@renderer/types/npc'
import { ArrowLeft, FileX as Delete, Check, X } from 'lucide-react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const classOptions = ['Warrior', 'Mage', 'Rogue', 'Cleric']
const raceOptions = ['Human', 'Elf', 'Dwarf', 'Orc']
const genderOptions = ['Homem', 'Mulher', 'Não-binário']

const npcSchema = z.object({
  name: z.string(),
  class: z.string(),
  race: z.string(),
  age: z.coerce.number().positive().int(),
  gender: z.string(),
  description: z.string().max(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
})

type npcSchema = z.infer<typeof npcSchema>

const EditNpc: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<npcSchema>({
    resolver: zodResolver(npcSchema)
  })

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

  async function handleNpcSubmit(data: npcSchema): Promise<void> {
    for (const key in data) {
      if (data[key] === '') {
        delete data[key]
      } else {
        console.log('changing', key, data[key])
        try {
          await window.api.editNpc(key.toString(), data[key], Number(id))
          navigate(`/npc/${id}`)
        } catch (err) {
          console.error(err)
        }
      }
    }
    reset()
  }

  return (
    <Layout>
      <div className="w-full h-full px-16 py-12 ">
        <div className="relative w-full h-fit text-zinc-900 dark:text-zinc-500 bg-zinc-300 dark:bg-zinc-900 rounded-md flex flex-col p-12 gap-4">
          <Link
            to={`/npc/${id}`}
            className="absolute left-4 top-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <ArrowLeft />
          </Link>
          <div className="absolute flex items-center gap-2 top-4 right-4 text-zinc-600 dark:text-zinc-300 ">
            <button
              onClick={handleDelete}
              className="flex items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
            >
              <Delete />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleNpcSubmit)}>
            <div className="flex gap-10 w-full h-fit">
              <div className="rounded-md hover:z-10 z-20 w-48 h-48 overflow-hidden flex items-center justify-center">
                <img src={npc?.imagePath} alt="npc" className="object-cover" />
              </div>
              <div className="flex gap-80 py-6">
                <div className="flex flex-col font-semibold  text-zinc-800 dark:text-zinc-200 gap-4">
                  <div className="relative flex  gap-1">
                    <span className="text-zinc-500">Nome:</span>
                    <input
                      placeholder={npc?.name}
                      className=" font-normal bg-transparent outline-none border-b border-zinc-400 hover:border-violet-600 focus:border-violet-800 bg-none"
                      {...register('name')}
                    />
                  </div>
                  <div className="relative flex  gap-1">
                    <span className="text-zinc-500">Idade:</span>
                    <input
                      placeholder={npc?.age.toString()}
                      className=" font-normal w-12 text-center  bg-transparent outline-none border-b border-zinc-400 hover:border-violet-600 focus:border-violet-800 bg-none"
                      {...register('age')}
                    />
                  </div>
                </div>
                <div className="flex font-semibold text-zinc-800 flex-col dark:text-zinc-200  gap-4">
                  <div className="flex gap-1 justify-end items-center">
                    <span className="text-zinc-500">Raça:</span>
                    <select
                      {...register('race')}
                      className="p-2 font-normal text-sm outline-none border hover:border-violet-600 dark:border-zinc-800 focus:border-violet-800 dark:bg-zinc-800"
                    >
                      {raceOptions.map((race) => (
                        <option value={race} key={race}>
                          {race}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-1 justify-end items-center">
                    <span className="text-zinc-500">Classe:</span>
                    <select
                      {...register('class')}
                      className="p-2 font-normal text-sm outline-none border hover:border-violet-600 dark:border-zinc-800 focus:border-violet-800 dark:bg-zinc-800"
                    >
                      {classOptions.map((npcClass) => (
                        <option value={npcClass} key={npcClass}>
                          {npcClass}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-1 justify-end items-center">
                    <span className="text-zinc-500">Gênero:</span>
                    <select
                      {...register('gender')}
                      className="p-2 font-normal text-sm outline-none border hover:border-violet-600 dark:border-zinc-800 focus:border-violet-800 dark:bg-zinc-800"
                    >
                      {genderOptions.map((gender) => (
                        <option value={gender} key={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex relative flex-col font-semibold text-zinc-800 dark:text-zinc-200 gap-1">
              <span className="text-zinc-600">Descrição:</span>
              <div className="text-sm w-full font-light">
                <textarea
                  {...register('description')}
                  placeholder={npc?.description}
                  className="w-full outline-1 bg-zinc-300 dark:bg-zinc-800 h-20 flex-none text-sm p-4 border-zinc-400 font-normal border outline-none hover:border-violet-700 focus:border-violet-700"
                />
              </div>
              <div className="w-full gap-2 flex items-center justify-center">
                <button
                  type="submit"
                  disabled={false}
                  className="p-2 w-fit font-semibold bg-violet-600 hover:bg-violet-400 hover:text-violet-100 transition text-zinc-300 rounded-md disabled:bg-zinc-800"
                >
                  <Check />
                </button>
                <Link to={`/npc/${id}`}>
                  <div className="p-2 w-fit font-semibold bg-violet-600 hover:bg-violet-400 hover:text-violet-100 transition text-zinc-300 rounded-md disabled:bg-zinc-800">
                    <X />
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default EditNpc
