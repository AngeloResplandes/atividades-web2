import { FastifyInstance } from "fastify";
import { db } from "../database/knex.js";
import { checkSession } from "../middlewares/check-session.js";
import { randomUUID } from "crypto";

export async function mealsRoutes(app: FastifyInstance) {
    app.post("/", { preHandler: [checkSession] }, async (request, reply) => {
        const userId = (request as any).userId as string;
        const body = request.body as {
            name: string;
            description?: string | null;
            datetime: string;
            is_diet: boolean;
        };

        if (!body.name || !body.datetime || typeof body.is_diet !== "boolean") {
            return reply.status(400).send({ error: "Invalid request body" });
        }

        const meal = {
            id: randomUUID(),
            user_id: userId,
            name: body.name,
            description: body.description ?? null,
            datetime: new Date(body.datetime).toISOString(),
            is_diet: body.is_diet,
        };

        await db("meals").insert(meal);

        return reply.status(201).send(meal);
    });

    app.get("/:id", { preHandler: [checkSession] }, async (request, reply) => {
        const userId = (request as any).userId as string;
        const { id } = request.params as { id: string };

        const meal = await db("meals").where({ id, user_id: userId }).first();
        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        return reply.send(meal);
    });

    app.put("/:id", { preHandler: [checkSession] }, async (request, reply) => {
        const userId = (request as any).userId as string;
        const { id } = request.params as { id: string };
        const body = request.body as {
            name?: string;
            description?: string | null;
            datetime?: string;
            is_diet?: boolean;
        };

        const meal = await db("meals").where({ id, user_id: userId }).first();
        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        const updated = {
            name: body.name ?? meal.name,
            description: body.description ?? meal.description,
            datetime: body.datetime
                ? new Date(body.datetime).toISOString()
                : meal.datetime,
            is_diet:
                typeof body.is_diet === "boolean" ? body.is_diet : meal.is_diet,
        };

        await db("meals").where({ id, user_id: userId }).update(updated);

        const mealAfter = await db("meals")
            .where({ id, user_id: userId })
            .first();
        return reply.send(mealAfter);
    });

    app.delete("/:id", { preHandler: [checkSession] }, async (request, reply) => {
        const userId = (request as any).userId as string;
        const { id } = request.params as { id: string };

        const meal = await db("meals").where({ id, user_id: userId }).first();
        if (!meal) return reply.status(404).send({ error: "Meal not found" });

        await db("meals").where({ id, user_id: userId }).del();

        return reply.status(204).send();
    });
}
