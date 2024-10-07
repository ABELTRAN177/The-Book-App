const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Set the port to the environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Create a new Apollo server with the imported type definitions and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Initialize an Express application
const app = express();

const startApolloServer = async () => {
    // Start the Apollo server
    await server.start(); 

    // Middleware to parse urlencoded and json requests
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Use the Apollo server as middleware on the /graphql route
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));

    // If the app is in production mode, serve static files from the client/dist directory
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        // Send the client/index.html file when the root route is accessed
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    // When the database is open, start the server
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();