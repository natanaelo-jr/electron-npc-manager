import { NpcType } from '../types/npc'
import { database } from '../database'
import fs from 'fs'
import { app } from 'electron'
import path from 'path'

export async function deleteNpc(id: number): Promise<boolean> {
  const db = database.getDb()

  db.get('SELECT name FROM npcs WHERE id = ?', [id], (err, row: NpcType): void => {
    if (err) {
      console.error(err)
    } else {
      const userDataPath = app.getPath('userData')
      const imagePath = path.join(userDataPath, 'images', `${row.name}-picture.png`)
      if (!fs.existsSync(imagePath)) {
        return
      }
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err)
          throw err
        } else {
          console.log('Image deleted')
        }
      })
    }
  })

  return new Promise<boolean>((resolve, reject) => {
    db.get('DELETE FROM npcs WHERE id = ?', [id], (err, row: NpcType) => {
      if (err) {
        reject(err)
      } else if (!row) {
        reject(new Error('NPC not found'))
      } else {
        resolve(true)
      }
    })
  })
}
