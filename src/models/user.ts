import { Model } from 'objection';
import tables from '../../knex/constants';

class User extends Model {

  readonly id!: string;
  username!: string;
  email?: string;
  hash!: string;

  static get tableName() {
    return tables.USER_TABLE;
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'hash'],

      properties: {
        id: { type: 'string' },
        username: { type: 'string', minLength: 1 },
        hash: { type: 'string', minLength: 10, },
        email: { type: 'string' },
        created_date: { type: 'number' },
        modified_date: { type: 'number' },
      },
    };
  }
}

export default User;
