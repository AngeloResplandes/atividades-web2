import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { applyMiddleware, notFound } from "../middleware/middleware.js";
import { createTask, listTasks, updateTask, deleteTask, completeTask } from "../controller/tasks.controller.js";

export async function router(req: IncomingMessage, res: ServerResponse) {
    if (applyMiddleware(req, res)) return;

    const parsedUrl = parse(req.url || "", true);
    const method = req.method || "GET";
    const path = parsedUrl.pathname || "/";

    if (path === "/" && method === "GET") {
        res.writeHead(200);
        return res.end(JSON.stringify({ message: "Atividade 1 - NODE" }));
    }

    const segments = path.split("/").filter(Boolean);

    if (segments.length === 1 && segments[0] === "tasks" && method === "POST") {
        return createTask(req, res);
    }

    if (segments.length === 1 && segments[0] === "tasks" && method === "GET") {
        return listTasks(res);
    }

    if (segments.length === 2 && segments[0] === "tasks" && method === "PUT") {
        const id = segments[1];
        if (!id) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "ID da task não fornecido" }));
        }
        return updateTask(req, res, id);
    }

    if (segments.length === 2 && segments[0] === "tasks" && method === "DELETE") {
        const id = segments[1];
        if (!id) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "ID da task não fornecido" }));
        }
        return deleteTask(req, res, id);
    }

    if (segments.length === 3 && segments[0] === "tasks" && segments[2] === "complete" && method === "PATCH") {
        const id = segments[1];
        if (!id) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "ID da task não fornecido" }));
        }
        return completeTask(res, id);
    }

    return notFound(res);
}
