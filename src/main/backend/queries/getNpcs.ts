import { NpcType } from '../types/npc'
import { database } from '../database'

export function getNpcs(): Promise<NpcType[]> {
  const db = database.getDb()

  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM npcs', [], (err, rows: NpcType[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
