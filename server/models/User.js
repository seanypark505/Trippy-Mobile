import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const User = mongoose.model('User', userSchema);

modules.exports = User;
