import UploadImage from '@renderer/components/Register/UploadImage'
import { useState } from 'react'
import { NpcType } from '../types/npc'
import Layout from '@renderer/layout/Layout'

const Register: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)

  async function handleAddNpc(): Promise<NpcType | void> {
    const npc: NpcType = {
      name: 'Gorak',
      race: 'Orc',
      age: 30,
      gender: 'Male',
      class: 'Warrior',
      description: 'A fierce warrior.'
    }

    if (imageFile) {
      const reader = new FileReader()

      reader.onloadend = async (): Promise<void> => {
        console.log('FileReader onloadend triggered')
        if (reader.result) {
          const arrayBuffer = reader.result as ArrayBuffer
          const buffer = new Uint8Array(arrayBuffer)
          try {
            await window.api.addNpc(npc, buffer)
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
      console.error('No image file selected')
    }
  }

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="w-full h-full flex items-center flex-col gap-4 justify-center">
          <div className="flex items-center justify-center">
            <UploadImage setImageFile={setImageFile} />
            {imageFile && (
              <button onClick={handleAddNpc}>
                <div className="px-4 py-2 flex items-center bg-blue-800 rounded-md hover:blue-950 text-zinc-200">
                  Enviar
                </div>
              </button>
            )}
          </div>
          <h1 className="font-bold">Hello World</h1>
        </div>
      </div>
    </Layout>
  )
}

export default Register
