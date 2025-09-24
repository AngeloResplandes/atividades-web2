import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import { usersRoutes } from './routes/users';
import { mealsRoutes } from './routes/meals';
import 'dotenv/config';

const app = Fastify({ logger: true });

app.register(cookie);
app.register(usersRoutes, { prefix: '/users' });
app.register(mealsRoutes, { prefix: '/meals' });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
    app.log.info(`Server running on http://localhost:${PORT}`);
});