import mongoose from 'mongoose';

const { Schema } = mongoose;

const Channel = new Schema({
  name: String,
  private: { type: Boolean, enum: [true, false], default: false },
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Channel', Channel);
