import { SQLiteDatabase } from "expo-sqlite";
import { Location } from "@/types";

export const getLocations = async (db: SQLiteDatabase) => {
  try {
    return await db.getAllAsync<Location>("SELECT * FROM locations");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addLocation = async (db: SQLiteDatabase, name: string) => {
  try {
    await db.runAsync("INSERT INTO locations (name) VALUES (?)", name);
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocation = async (db: SQLiteDatabase, id: number) => {
  try {
    await db.runAsync("DELETE FROM locations WHERE id = ?", id);
  } catch (error) {
    console.log(error);
  }
};
