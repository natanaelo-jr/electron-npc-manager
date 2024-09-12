import { NpcType } from '../types/npc'
import { database } from '../database'

export async function getNpcById(id: number): Promise<NpcType> {
  const db = database.getDb()

  return new Promise<NpcType>((resolve, reject) => {
    db.get('SELECT * FROM npcs WHERE id = ?', [id], (err, row: NpcType) => {
      if (err) {
        reject(err)
      } else if (!row) {
        reject(new Error('NPC not found'))
      } else {
        resolve(row)
      }
    })
  })
}
