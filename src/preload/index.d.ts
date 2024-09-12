import { ElectronAPI } from '@electron-toolkit/preload'
import { NpcType } from '../main/backend/types/npc'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getNpcs: () => Promise<NpcType[]>
      addNpc: (npc: NpcType, imageBuffer: Uint8Array) => Promise<NpcType>
      getNpcById: (id: number) => Promise<NpcType>
    }
  }
}
