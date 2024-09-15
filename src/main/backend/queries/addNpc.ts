import { NpcType } from '../types/npc'
import { database } from '../database'
import path from 'path'
import fs from 'fs'
import { app } from 'electron'

export async function addNpc(npc: NpcType, imageBuffer: Uint8Array): Promise<NpcType> {
  const db = database.getDb()

  const userDataPath = app.getPath('userData')
  const imagesDir = path.join(userDataPath, 'images')

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
  }

  const imageName = `${npc.name.replace(/\s/g, '_')}-picture.png`
  const imagePath = imageBuffer ? path.join(imagesDir, imageName) : null

  if (imageBuffer && imagePath) {
    fs.writeFileSync(imagePath, imageBuffer)
  }

  const imageUrl = `http://localhost:3000/images/${imageName}`

  return new Promise((resolve, rejected) => {
    db.run(
      'INSERT INTO npcs (name, race, age, gender, class, description, imagePath) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [npc.name, npc.race, npc.age, npc.gender, npc.class, npc.description, imageUrl],
      function (this: { lastID: number }, err) {
        if (err) {
          rejected(err)
        } else {
          resolve({ ...npc, id: this.lastID, imagePath: imageUrl })
        }
      }
    )
  })
}
