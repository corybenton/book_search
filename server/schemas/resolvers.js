const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            const foundUser = await User.findOne({ username });

            if (!foundUser) {
                throw AuthenticationError;
            }

            return foundUser;
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        deleteBook: async (parent, { book }, context) => {
            if(context.user) {
                const delBook = await Book.findOneAndDelete({
                    _id: book,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book._id } }
                );

                return delBook;
            }
            throw AuthenticationError;
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;