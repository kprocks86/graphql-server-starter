import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { SECRET1 } from './secret';

const getUser = async (req) => {
  const { headers: { token } } = req;
  if (token) {
    try {
      return await jwt.verify(token, SECRET1);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  } else {
    throw new AuthenticationError('Your session expired. Sign in again.');
  }
};

const demo = () => true;

export {
  getUser,
  demo,
};
