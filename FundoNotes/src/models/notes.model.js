import { bool, boolean, string } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
      title: {
      type: String,
      required: true
     },
     description: {
      type: String,
      required: true
     },
     color: {
      type: String
     }
    },
  {
    timestamps: true
  }
);

export default model('Notes', notesSchema);