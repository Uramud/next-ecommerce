import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';

const signToken = (user) => {
  //here jwt.sign accept object as payload
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    //Bearer token, it returns token from authorization header
    const token = authorization.slice(7, authorization.length);
    JsonWebTokenError.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Tooken is not provided' });
  }
};

export { signToken, isAuth };
