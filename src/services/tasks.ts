import { SQLiteDatabase } from "expo-sqlite";
import { Task } from "@/types";

export const getTask = async (db: SQLiteDatabase, id: number) => {
  try {
    return await db.getFirstAsync<Task>("SELECT * FROM tasks WHERE id = ?", id);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTasksByLocation = async (db: SQLiteDatabase, id: number) => {
  try {
    return await db.getAllAsync<Task>(
      "SELECT * FROM tasks WHERE location_id = ?",
      id
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTask = async (db: SQLiteDatabase, task: Omit<Task, "id">) => {
  try {
    await db.runAsync(
      "INSERT INTO tasks (location_id, title, description, image_uri, is_urgent) VALUES (?, ?, ?, ?, ?)",
      task.location_id,
      task.title,
      task.description,
      task.image_uri,
      task.is_urgent
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (db: SQLiteDatabase, task: Task) => {
  try {
    await db.runAsync(
      "UPDATE tasks SET location_id = ?, title = ?, description = ?, image_uri = ?, is_urgent = ? WHERE id = ?",
      task.location_id,
      task.title,
      task.description,
      task.image_uri,
      task.is_urgent,
      task.id
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (db: SQLiteDatabase, id: number) => {
  try {
    await db.runAsync("DELETE FROM tasks WHERE id = ?", id);
  } catch (error) {
    console.log(error);
  }
};
