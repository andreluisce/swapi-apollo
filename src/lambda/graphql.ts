import config from "config";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { ApolloServer } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { getFetcher } from "../connectors/swapi";
import getResolversWithFetchers from "../resolvers/index";

const apiHost = String(config.get("serverRuntimeConfig.endpoints.swapiAPI"));

const fetcher = getFetcher(apiHost);

const PORT = config.get("serverRuntimeConfig.ports.localServer");

const typeDefs = loadFilesSync("./schema/*.gql");

const resolvers = getResolversWithFetchers(fetcher);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const handler = server.createHandler();
