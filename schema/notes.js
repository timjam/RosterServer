import { gql } from 'apollo-server-express';

export default gql `
  extend type Query {
    notes: [Note!]
    note(id: ID!): Note!
  }

  type Note {
    id: ID!
    text: String!
  }
`;