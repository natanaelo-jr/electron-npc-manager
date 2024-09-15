import { useEffect, useState } from 'react'
import { NpcType } from '../types/npc'
import NpcCard from '@renderer/components/Home/NpcCard'
import Layout from '@renderer/layout/Layout'

const Home: React.FC = () => {
  const [npcs, setNpcs] = useState<NpcType[]>([])
  useEffect(() => {
    const fetchNpcs = async (): Promise<NpcType[]> => {
      const npcs = await window.api.getNpcs()
      return npcs
    }
    fetchNpcs().then((npcsresponse) => setNpcs(npcsresponse))
  }, [])

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="h-fit w-fit gap-10 py-12 px-16 flex items-center justify-center flex-wrap">
          {npcs.map((npc, index) => (
            <NpcCard npc={npc} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
