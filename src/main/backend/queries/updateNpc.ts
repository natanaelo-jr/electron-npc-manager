import { NpcType } from '../types/npc'
import { database } from '../database'

interface RunContext {
  changes: number
}

export async function updateNpc(attribute: string, value: string, id: number): Promise<NpcType> {
  const db = database.getDb()

  return new Promise<NpcType>((resolve, reject) => {
    const query = `UPDATE npcs SET ${attribute} = ? WHERE id = ?`

    db.run(query, [value, id], function (this: RunContext, err) {
      if (err) {
        reject(err)
      } else if (this.changes === 0) {
        reject(new Error('NPC not found'))
      } else {
        // Se a atualização for bem-sucedida, consulte novamente o NPC atualizado
        db.get('SELECT * FROM npcs WHERE id = ?', [id], (err, row: NpcType) => {
          if (err) {
            reject(err)
          } else {
            resolve(row)
          }
        })
      }
    })
  })
}
