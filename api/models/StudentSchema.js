const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  age: {
    type: String,
    required: [true, "NPM is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  courses: {
    type: [String],
    required: [true, "courses is required"],
  },
  photo: {
    type: String,
    required: [true, "photo is required"],
  },
});
const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
