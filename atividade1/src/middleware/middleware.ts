import { IncomingMessage, ServerResponse } from "http";

export function applyMiddleware(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return true;
    }

    return false;
}

export function notFound(res: ServerResponse) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota não encontrada" }));
}
