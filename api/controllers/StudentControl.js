const Student = require("../models/StudentSchema");

addStudent = async (req, res) => {
  const { name, age, address, courses, photo } = req.body;
  const student = new Student({ name, age, address, courses, photo });
  try {
    await student.save();
    res.status(200).json({ message: "Data Student berhasil ditambahkan", data: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

getStudent = async function (req, res) {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(400).send(err);
  }
};

updateStudent = async function (req, res) {
  try {
    const { name, age, address, courses, photo } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, { name, age, address, courses, photo }, { new: true }).exec();
    if (!student) throw new Error("Student tidak ada");
    res.status(200).json({ message: "Data Student berhasil diperbaharui", data: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

deleteStudent = async function (req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id).exec();
    if (!student) throw new Error("Student tidak ada");
    res.status(200).json({ message: "Data Student berhasil dihapus", data: student });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
