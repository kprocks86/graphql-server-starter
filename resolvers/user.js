import { AuthenticationError, ValidationError, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET1 } from '../secret';


export default {
  Query: {
    getUsers: (parent, args, { model: { User }, me }) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return User.find({});
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }, { model: { User } }) => {
      // check wheather or not user already exsits or not
      const exist = await User.findOne({ email });
      if (exist) throw new ValidationError('Email is already in use');

      // create user in db and return the Object
      const user = new User({ name, email, password });
      await user.save();
      return { user };
    },
    login: async (parent, { email, password }, { model: { User } }) => {
      // check wheather or not user is registered or not
      const exist = await User.findOne({ email });
      if (!exist) throw new UserInputError('Please register first');

      // check the for the password
      const passValid = await bcrypt.compare(password, exist.password);
      if (!passValid) throw new ValidationError('Password is incorrect');

      // create token and refresh token
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ userId: exist._id }, SECRET1);
      return {
        ok: true,
        token,
      };
    },
  },
};
