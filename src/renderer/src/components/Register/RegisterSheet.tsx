import { useForm } from 'react-hook-form'
import UploadImage from './UploadImage'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const npcSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  class: z.string().min(1, { message: 'Classe é obrigatório' }),
  race: z.string().min(1, { message: 'Raça é obrigatório' }),
  age: z.coerce.number().min(1, { message: 'Idade é obrigatório' }),
  gender: z.string().min(1, { message: 'Gênero é obrigatório' }),
  description: z
    .string()
    .max(500, { message: 'Descrição deve ter no máximo 500 caracteres' })
    .min(1, { message: 'Descrição é obrigatória' })
})

const classOptions = ['Warrior', 'Mage', 'Rogue', 'Cleric']
const raceOptions = ['Human', 'Elf', 'Dwarf', 'Orc']
const genderOptions = ['Homem', 'Mulher', 'Não-binário']

type npcSchema = z.infer<typeof npcSchema>

const RegisterSheet: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<npcSchema>({
    resolver: zodResolver(npcSchema)
  })

  function handleNpcSubmit(data: npcSchema): void {
    const npctoAdd = {
      name: data.name,
      class: data.class,
      age: data.age,
      gender: data.gender,
      race: data.race,
      description: data.description
    }

    if (imageFile) {
      setImageError(false)
      const reader = new FileReader()

      reader.onloadend = async (): Promise<void> => {
        console.log('FileReader onloadend triggered')
        if (reader.result) {
          const arrayBuffer = reader.result as ArrayBuffer
          const buffer = new Uint8Array(arrayBuffer)
          try {
            await window.api.addNpc(npctoAdd, buffer)
            reset()
            setDescriptionLength(0)
            setImageFile(null)
          } catch (err) {
            console.error('Erro ao adicionar NPC:', err)
          }
        } else {
          console.error('Error: reader.result is null')
        }
      }

      reader.onerror = (error): void => {
        console.error('FileReader error:', error)
      }

      reader.readAsArrayBuffer(imageFile)
    } else {
      setImageError(true)
    }
  }

  const [descriptionLength, setDescriptionLength] = useState(0)
  const [imageError, setImageError] = useState(false)

  return (
    <form onSubmit={handleSubmit(handleNpcSubmit)}>
      <div className="w-full h-full px-16 py-12 ">
        <div className=" relative w-full h-full text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900 rounded-md flex flex-col p-12 gap-4">
          <Link
            to="/"
            className="absolute left-4 top-4 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <ArrowLeft />
          </Link>
          <div className="flex gap-10 w-full h-fit">
            <div className="relative">
              {imageError && (
                <span className="absolute top-[-20px] text-xs font-normal px-1 bg-red-600 text-zinc-400 opacity-80">
                  Selecione uma imagem
                </span>
              )}
              {imageFile && (
                <div className="absolute hover:opacity-50 rounded-md hover:z-10 z-20 w-48 h-48 overflow-hidden flex items-center justify-center">
                  <img src={URL.createObjectURL(imageFile)} alt="npc" className="object-cover" />
                </div>
              )}
              <div className={`relative z-10 hover:z-30 `}>
                <UploadImage setImageFile={setImageFile} />
              </div>
            </div>
            <div className="flex gap-80 py-6">
              <div className="flex flex-col font-semibold  text-zinc-800 dark:text-zinc-200 justify-between">
                <div className="relative flex flex-col gap-1">
                  {errors.name && (
                    <span className="absolute top-[-20px] text-xs font-normal px-1 bg-red-600 text-zinc-400 opacity-80">
                      {errors.name.message}
                    </span>
                  )}
                  <span>Nome:</span>
                  <input
                    placeholder="Erus"
                    className=" font-normal bg-transparent outline-none border-b border-zinc-400 hover:border-violet-600 focus:border-violet-800 bg-none"
                    {...register('name')}
                  />
                </div>
                <div className="relative flex flex-col gap-1">
                  {errors.age && (
                    <span className="absolute top-[-20px] text-xs font-normal px-1 bg-red-600 text-zinc-400 opacity-80">
                      {errors.age.message}
                    </span>
                  )}
                  <span>Idade:</span>
                  <input
                    placeholder="38"
                    className=" font-normal w-12 text-center  bg-transparent outline-none border-b border-zinc-400 hover:border-violet-600 focus:border-violet-800 bg-none"
                    {...register('age')}
                  />
                </div>
              </div>
              <div className="flex font-semibold text-zinc-800 dark:text-zinc-200 flex-col gap-4">
                <div className="flex gap-1 justify-end items-center">
                  <span>Raça:</span>
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
                  <span>Classe:</span>
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
                  <span>Gênero:</span>
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
            {errors.description && (
              <span className="absolute right-0 px-1 top-1 text-xs font-normal bg-red-600 text-zinc-400 opacity-80">
                {errors.description.message}
              </span>
            )}
            <span>Descrição:</span>
            <textarea
              {...register('description')}
              onChange={(e) => {
                setDescriptionLength(e.target.value.length)
              }}
              className="w-full outline-1 bg-zinc-300 dark:bg-zinc-800 h-20 flex-none text-sm p-4 border-zinc-400 font-normal border outline-none hover:border-violet-700 focus:border-violet-700"
            />
            <span className="text-xs font-normal text-zinc-500">{descriptionLength}/500</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={false}
              className="px-4 py-2 font-semibold bg-violet-600 hover:bg-violet-400 hover:text-violet-100 transition text-zinc-300 rounded-md disabled:bg-zinc-800"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default RegisterSheet
