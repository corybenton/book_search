const { User, Book } = require('../models');
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
        me: async (parent, args, context) => {
            if (context.user) {
                try {
                    const foundUser = await User.findOne({ _id: context.user.data._id });

                    return foundUser;
                } catch (err) {
                    console.log(err);
                }
            }
            throw AuthenticationError;
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
            if (context.user) {

                const delBook = await User.findOneAndUpdate(
                    { _id: context.user.data._id },
                    { $pull: { savedBooks: book } }
                );

                return delBook;
            }
            throw AuthenticationError;
        },
        saveBook: async (parent, { book }, context) => {
            //const token = context.headers.authorization.split(' ').pop().trim();
            //const data = authMiddleware(content.res);
            if (context.user) {
                return User.findOneAndUpdate(
                    { username: context.user.data.username },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;