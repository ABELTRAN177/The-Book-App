const { User: UserModel } = require('../models');
const { signToken: generateToken, AuthenticationError: AuthError } = require('../utils/auth');

const resolvers = {
    Query: {
        // Resolver for the "me" query
        me: async (parent, args, context) => {
            if (context.user) {
                // If the user is authenticated, find the user in the database and return their data
                const userData = await UserModel.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            // If the user is not authenticated, throw an authentication error
            throw  AuthError;
        },
    },

    Mutation: {
        // Resolver for the "login" mutation
        login: async (parent, { email, password }) => {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw AuthError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthError;
            }

            const token = generateToken(user);
            return { token, user };
        },

        // Resolver for the "addUser" mutation
        addUser: async (parent, args) => {
            const user = await UserModel.create(args);
            const token = generateToken(user);

            return { token, user };
        },

        // Resolver for the "saveBook" mutation
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw  AuthenticationError;
        },
    },
};

module.exports = resolvers;