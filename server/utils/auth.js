const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();

// set token secret and expiration date
const secret = 'C83++mqL8q!v3Ri,073m-jbFT$t]Aj{_GL?H32%3b@Dnw4KG;5NS,^AzKhR?8K>6';
const expiration = '2d';

module.exports = {
  // function for our authenticated routes
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const authenticatedPerson = jwt.verify(token, secret, { maxAge: expiration });
      req.user = authenticatedPerson;
    } catch (err) {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    // send to next endpoint
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
