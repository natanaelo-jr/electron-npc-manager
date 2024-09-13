import { NpcType } from '@renderer/types/npc'

interface NpcCardProps {
  npc: NpcType
}
const NpcCard: React.FC<NpcCardProps> = ({ npc }) => {
  return (
    <div className="h-fit flex-col flex gap-1 rounded-sm shadow-md bg-slate-500 w-fit p-2">
      <div className="w-48 h-48 flex items-center">
        <img src={npc.imagePath} alt="npcPic" className="object-cover w-full h-full" />
      </div>
      <span className="font-bold text-sm text-zinc-800 ">{npc.name}</span>
      <span className="text-xs text-zinc-800 ">{npc.race}</span>
    </div>
  )
}

export default NpcCard
