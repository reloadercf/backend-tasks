import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  nameTask: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dataDelivery: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
