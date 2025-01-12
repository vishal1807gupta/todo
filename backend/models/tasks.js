import mongoose from 'mongoose';

const tasksSchema = mongoose.Schema(
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

const tasks = mongoose.model('tasks', tasksSchema);
export default tasks;