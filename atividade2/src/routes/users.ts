import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { db } from '../database/knex';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const body = request.body as { name?: string; email?: string };
        const name = body.name?.trim();
        const email = body.email?.trim();

        if (!name || !email) {
            return reply.status(400).send({ error: 'name and email are required' });
        }

        const existing = await db('users').where({ email }).first();
        if (existing) {
            return reply.status(409).send({ error: 'Email already in use' });
        }

        const id = randomUUID();

        await db('users').insert({ id, name, email });

        reply
            .setCookie('sessionId', id, { path: '/', httpOnly: true })
            .status(201)
            .send({ id, name, email });
    });

    app.get('/', async (request, reply) => {
        const users = await db('users').select('id', 'name', 'email', 'created_at');
        return reply.send(users);
    });
}