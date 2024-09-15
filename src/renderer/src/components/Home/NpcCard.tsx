import { NpcType } from '@renderer/types/npc'
import { Link } from 'react-router-dom'

interface NpcCardProps {
  npc: NpcType
}
const NpcCard: React.FC<NpcCardProps> = ({ npc }) => {
  return (
    <Link to={`/npc/${npc.id}`}>
      <div className="h-fit flex-col flex gap-1 rounded-lg shadow-md bg-zinc-400 w-fit p-2">
        <div className="px-1 pt-1 rounded-lg overflow-hidden w-52 h-52 flex items-center">
          <img src={npc.imagePath} alt="npcPic" className="object-cover rounded-md w-full h-full" />
        </div>
        <span className="pt-2 pl-1 font-bold text-zinc-800 ">{npc.name}</span>
        <span className="pl-1 text-xs text-zinc-800 pb-2">
          {npc.race} / {npc.class}
        </span>
      </div>
    </Link>
  )
}

export default NpcCard
