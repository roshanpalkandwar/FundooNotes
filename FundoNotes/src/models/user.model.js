import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    Firstname: {
      type: String
    },
    Lastname: {
      type: String
    },
    Username: {
      type: String
    },
    Passaword: {
      type: String
    }

  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
