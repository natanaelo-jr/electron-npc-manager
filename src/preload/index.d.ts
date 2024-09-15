import { ElectronAPI } from '@electron-toolkit/preload'
import { NpcType } from '../main/backend/types/npc'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getNpcs: () => Promise<NpcType[]>
      addNpc: (npc: NpcType, imageBuffer: Uint8Array) => Promise<NpcType>
      getNpcById: (id: number) => Promise<NpcType>
      deleteNpc: (id: number) => Promise<boolean>
      editNpc: (attribute: string, value: string, id: number) => Promise<boolean>
    }
  }
}
