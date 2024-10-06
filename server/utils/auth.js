const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const secret = 'my secret string';
const experiaton = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Authentication Error', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),

    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: experiaton });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },

    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: experiaton });
    },
};
