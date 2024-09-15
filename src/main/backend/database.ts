import sqlite3 from 'sqlite3'
import { app } from 'electron'
import path from 'path'

class Database {
  private db: sqlite3.Database

  constructor() {
    const userDataPath = app.getPath('userData')
    const dbPath = path.join(userDataPath, 'database.db')

    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log('Connected to the database.')
        this.initialize()
      }
    })
  }
  private initialize(): void {
    this.db.run(`CREATE TABLE IF NOT EXISTS npcs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      race TEXT,
      age INTEGER,
      gender TEXT,
      class TEXT,
      description TEXT,
      imagePath TEXT
      );`)
  }

  public getDb(): sqlite3.Database {
    return this.db
  }
}

export const database = new Database()
