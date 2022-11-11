import config from "config";
import express from "express";
import bodyParser from "body-parser";

import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { getFetcher } from "./connectors/swapi";
import getResolversWithFetchers from "./resolvers/index";

const apiHost = config.get("serverRuntimeConfig.endpoints.swapiAPI") as string;

const fetcher = getFetcher(apiHost);

const PORT = config.get("serverRuntimeConfig.ports.localServer");
const app = express();
app.use(bodyParser.json());
app.use("/static", express.static("assets"));

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

server.start().then(() => {
  server.applyMiddleware({ app });

  // // eslint-disable-next-line no-console
  app.listen(PORT, () =>
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`)
  );
});
