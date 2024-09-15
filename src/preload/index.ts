import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { NpcType } from '../main/backend/types/npc'

// Custom APIs for renderer
const api = {
  getNpcs: (): Promise<NpcType[]> => ipcRenderer.invoke('get-npcs'),

  addNpc: (npc: NpcType, imageBuffer: Uint8Array): Promise<NpcType> =>
    ipcRenderer.invoke('add-npc', npc, imageBuffer),

  getNpcById: (id: number): Promise<NpcType> => ipcRenderer.invoke('get-npc', id),

  deleteNpc: (id: number): Promise<boolean> => ipcRenderer.invoke('delete-npc', id),

  editNpc: (attribute: string, value: string, id: number): Promise<boolean> =>
    ipcRenderer.invoke('edit-npc', attribute, value, id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('buffer', Buffer)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
