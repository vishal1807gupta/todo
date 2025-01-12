import mongoose from 'mongoose';

const notesSchema = mongoose.Schema(
  {
    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    todo: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const Notes = mongoose.model('notes', notesSchema);
export default Notes;