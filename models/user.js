import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
});

User.pre('save', function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
  return next();
});

export default mongoose.model('User', User);
