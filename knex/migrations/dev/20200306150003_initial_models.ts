import * as Knex from 'knex';
import tables from '../../constants';


export async function up(knex: Knex): Promise<any> {
  const exists = await knex.schema.hasTable(tables.USER_TABLE);
  if (!exists) {
    return knex.schema.createTable(tables.USER_TABLE, table =>{
      table.increments('id').unique().primary();
      table.string('username').unique();
      table.string('hash');
      table.string('email');
      table.bigInteger('created_date').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('modified_date').notNullable().defaultTo(knex.fn.now());
    });
  }
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists(tables.USER_TABLE);
}

