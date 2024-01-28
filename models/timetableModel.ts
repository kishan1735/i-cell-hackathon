import mongoose from "mongoose";

const timetableModel = new mongoose.Schema({
  email: {
    type: String,
  },
  timetable: {
    type: [Object],
    default: [],
  },
  rating: {
    type: Number,
  },
});

const Timetable =
  mongoose.models.Timetable || mongoose.model("Timetable", timetableModel);
export default Timetable;
