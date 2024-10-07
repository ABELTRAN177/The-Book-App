// Import the GraphQL schema definitions
const schemaDefinitions = require('./typeDefs');
// Import the GraphQL resolvers
const resolverFunctions = require('./resolvers');

// Export the schema definitions and resolvers
module.exports = { schemaDefinitions, resolverFunctions };