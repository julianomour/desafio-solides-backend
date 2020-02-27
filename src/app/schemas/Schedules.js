import mongoose from '../../database';

const SchedulesSchema = new mongoose.Schema({
  start_day: {
    type: Date,
  },
  start_lunch: {
    type: Date,
  },
  end_lunch: {
    type: Date,
  },
  end_day: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', SchedulesSchema);
export default User;
