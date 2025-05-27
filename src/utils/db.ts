import { type SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  if (!result) {
    throw new Error("Failed to get database user_version.");
  }

  let { user_version: currentDbVersion } = result;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location_id INTEGER NOT NULL,
        title TEXT NOT NULL, 
        description TEXT NOT NULL,
        image_uri TEXT,
        is_urgent INTEGER NOT NULL, 
        FOREIGN KEY (location_id) REFERENCES locations(id)
      )
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
