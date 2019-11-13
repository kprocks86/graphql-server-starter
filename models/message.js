import mongoose from 'mongoose';

const { Schema } = mongoose;

const Message = new Schema({
  text: String,
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  channelId: { type: Schema.Types.ObjectId, ref: 'channel' },
  type: { type: String, enum: ['text', 'file'], default: 'text' },
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Message', Message);
