import { ipcMain } from 'electron'
import { getNpcs } from './queries/getNpcs'
import { addNpc } from './queries/addNpc'
import { NpcType } from './types/npc'
import { getNpcById } from './queries/getNpcById'

export function registerIPCHandlers(): void {
  ipcMain.handle('get-npcs', async () => {
    try {
      const npcs = await getNpcs()
      return npcs
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  ipcMain.handle('add-npc', async (_, npc: NpcType, imageBuffer: Uint8Array) => {
    try {
      const newNpc = await addNpc(npc, imageBuffer)
      return newNpc
    } catch (err) {
      console.error(err)
      throw err
    }
  })

  ipcMain.handle('get-npc', async (_, id: number) => {
    try {
      const npc = await getNpcById(id)
      return npc
    } catch (err) {
      console.error(err)
      throw err
    }
  })
}
