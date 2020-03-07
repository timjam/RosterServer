import * as Knex from 'knex';
import tables from '../../constants';

const USER_LIST = [
  {
    username: 'Testaaja',
    password: 'Testipassu',
    email: 'testi@testaaja.tst',
  },
];

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tables.USER_TABLE).del()
        .then(() => {
            // Inserts seed entries
            return knex(tables.USER_TABLE).insert(USER_LIST);
        });
};
