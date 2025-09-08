import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { Task } from "../types/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbDir = join(__dirname, "..", "..", "database");
const dbFile = join(dbDir, "tasks.json");

if (!existsSync(dbDir)) {
    mkdirSync(dbDir);
}

let tasks: Task[] = [];

if (existsSync(dbFile)) {
    try {
        tasks = JSON.parse(readFileSync(dbFile, "utf-8"));
    } catch {
        tasks = [];
    }
} else {
    writeFileSync(dbFile, JSON.stringify([], null, 2));
}

export function getTasks() {
    return tasks;
}

export function saveTasks(newTasks: Task[]) {
    tasks = newTasks;
    writeFileSync(dbFile, JSON.stringify(tasks, null, 2));
}
