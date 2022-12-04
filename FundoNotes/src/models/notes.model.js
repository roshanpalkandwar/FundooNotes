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
      type: String,
     },
     isArchived: {
        type: Boolean,
        default: false
      },
      isTrash: {
        type: Boolean,
        default: false
      },
      UserId: {
        type: String,
      },
      pinnotes: {
        type: Boolean,
      }
    },
  {
    timestamps: true
  }
);

export default model('Notes', notesSchema);