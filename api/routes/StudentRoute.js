const express = require("express");
const router = express.Router();
const StudentControl = require("../controllers/StudentControl");

router.post("/addStudent", StudentControl.addStudent);
router.get("/getStudent", StudentControl.getStudent);
router.put("/updateStudent/:id", StudentControl.updateStudent);
router.delete("/deleteStudent/:id", StudentControl.deleteStudent);

module.exports = router;
