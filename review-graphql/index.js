/**
 * @fileoverview apollo server
 */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schemas/schema-graphql.js";
import Query from "./resolvers/Query.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query
  },
});

const gls = await startStandaloneServer(server, {listen: 3000});

console.log(`Server ready at ${gls.url}`);
