import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.string('name').notNullable();
        table.text('description').nullable();
        table.timestamp('datetime').notNullable();
        table.boolean('is_diet').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('meals');
}