import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

const PORT = process.env.PORT || 3000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url || "", true);
    const method = req.method || "GET";
    const path = parsedUrl.pathname || "/";

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (path === "/" && method === "GET") {
        res.writeHead(200);
        return res.end(JSON.stringify({ message: "API Node.js sem framework 🚀" }));
    }

    if (path === "/users" && method === "GET") {
        const users = [
            { id: 1, name: "Ângelo" },
            { id: 2, name: "Maria" },
        ];
        res.writeHead(200);
        return res.end(JSON.stringify(users));
    }

    if (path === "/users" && method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(201);
                return res.end(JSON.stringify({ message: "Usuário criado", data }));
            } catch (error) {
                res.writeHead(400);
                return res.end(JSON.stringify({ error: "JSON inválido" }));
            }
        });
        return;
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Rota não encontrada" }));
};

const server = createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
