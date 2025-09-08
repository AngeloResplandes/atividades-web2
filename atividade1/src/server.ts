import { createServer } from "http";
import { router } from "./routes/routes.js";

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});