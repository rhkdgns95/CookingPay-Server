import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import path from "path";

const allResolvers = fileLoader(
    path.join(__dirname, "./**/*.resolvers.*")
);

const allTypes = fileLoader(
    path.join(__dirname, "./**/*.graphql")
);

const mergedResolvers = mergeResolvers(allResolvers);
const mergedTypes = mergeTypes(allTypes);

const schema: GraphQLSchema = makeExecutableSchema({
    resolvers: mergedResolvers,
    typeDefs: mergedTypes
});

export default schema;