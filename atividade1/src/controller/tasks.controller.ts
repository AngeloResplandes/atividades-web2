import { randomUUID } from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import { getTasks, saveTasks } from "../config/database.js";
import type { Task } from "../types/types.js";

function parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => { body += chunk; });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject("JSON inválido");
            }
        });
    });
}

export async function createTask(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await parseBody(req);
        if (!data.title || !data.description) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "title e description são obrigatórios" }));
        }

        const tasks = getTasks();
        const newTask: Task = {
            id: randomUUID(),
            title: data.title,
            description: data.description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        };

        tasks.push(newTask);
        saveTasks(tasks);

        res.writeHead(201);
        res.end(JSON.stringify(newTask));
    } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err }));
    }
}

export function listTasks(res: ServerResponse) {
    res.writeHead(200);
    res.end(JSON.stringify(getTasks()));
}

export async function updateTask(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        const data = await parseBody(req);
        const tasks = getTasks();
        const task = tasks.find(t => t.id === id);

        if (!task) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Task não encontrada" }));
        }

        task.title = data.title ?? task.title;
        task.description = data.description ?? task.description;
        task.updated_at = new Date();

        saveTasks(tasks);

        res.writeHead(200);
        res.end(JSON.stringify(task));
    } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err }));
    }
}

export function deleteTask(req: IncomingMessage, res: ServerResponse, id: string) {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Task não encontrada" }));
    }

    tasks.splice(index, 1);
    saveTasks(tasks);

    res.writeHead(204);
    res.end();
}

export function completeTask(res: ServerResponse, id: string) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Task não encontrada" }));
    }

    task.completed_at = new Date();
    task.updated_at = new Date();
    saveTasks(tasks);

    res.writeHead(200);
    res.end(JSON.stringify(task));
}
