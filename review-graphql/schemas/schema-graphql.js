import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    comments(query: String): [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
  }
`;

export { typeDefs };
