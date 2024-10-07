const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// Define the secret key for JWT and the token expiration time
const jwtSecretKey = 'my secret string';
const tokenExpirationTime = '2h';

module.exports = {
    // Define a custom error for authentication failures
    AuthError: new GraphQLError('Authentication Error', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),

    // Middleware function to authenticate users
    authenticateUser: function ({ req }) {
        // Extract the token from the request
        let authToken = req.body.token || req.query.token || req.headers.authorization;

        // If the token is in the authorization header, extract it
        if (req.headers.authorization) {
            authToken = authToken.split(' ').pop().trim();
        }

        // If there's no token, return the request as is
        if (!authToken) {
            return req;
        }

        // Verify the token and add the user data to the request
        try {
            const { data } = jwt.verify(authToken, jwtSecretKey, { maxAge: tokenExpirationTime });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // Return the modified request
        return req;
    },

    // Function to sign a new JWT
    createToken: function ({ username, email, _id }) {
        // Define the payload for the JWT
        const payload = { username, email, _id };

        // Sign the JWT and return it
        return jwt.sign({ data: payload }, jwtSecretKey, { expiresIn: tokenExpirationTime });
    },
};