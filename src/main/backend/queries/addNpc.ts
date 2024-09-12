import { NpcType } from '../types/npc'
import { database } from '../database'
import path from 'path'
import fs from 'fs'

export async function addNpc(npc: NpcType, imageBuffer: Uint8Array): Promise<NpcType> {
  const db = database.getDb()

  //Image saving process

  const imagesDir = path.join(__dirname, '..', '..', 'public', 'images')
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  const imageName = `${npc.name.replace(/\s/g, '_')}-picture.png`
  const imagePath = imageBuffer ? path.join(imagesDir, imageName) : null

  if (imageBuffer && imagePath) {
    fs.writeFileSync(imagePath, imageBuffer)
  }

  return new Promise((resolve, rejected) => {
    db.run(
      'INSERT INTO npcs (name, race, age, gender, class, description, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [npc.name, npc.race, npc.age, npc.gender, npc.class, npc.description, imagePath],
      function (err) {
        if (err) {
          rejected(err)
        } else {
          resolve({ ...npc, id: this.lastID, imagePath: imageName })
        }
      }
    )
  })
}
