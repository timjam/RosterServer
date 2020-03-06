import * as Knex from 'knex';
import USER_TABLE from '../../../src/db/constants';

const USER_LIST = [
  {
    username: 'Testaaja',
    password: 'Testipassu',
    email: 'testi@testaaja.tst',
  },
];

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(USER_TABLE).del()
        .then(() => {
            // Inserts seed entries
            return knex(USER_TABLE).insert(USER_LIST);
        });
};
