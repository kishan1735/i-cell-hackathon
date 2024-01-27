import mongoose from "mongoose";

const courseSet = new mongoose.Schema({
  courses: {
    type: [Object],
    default: [],
  },
  userEmail: {
    type: String,
  },
});

const CourseSet =
  mongoose.models.CourseSet || mongoose.model("CourseSet", courseSet);
export default CourseSet;
