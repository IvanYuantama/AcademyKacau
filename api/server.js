const express = require("express");
const cors = require("cors");
const StudentRoute = require("./routes/StudentRoute");
const StudentConnect = require("./connects/StudentConnect");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173", // Sesuaikan dengan origin aplikasi frontend Anda
  optionsSuccessStatus: 200, // Beberapa browser membutuhkan ini untuk melihat respons sukses dari permintaan CORS
};

app.use(cors(corsOptions));

StudentConnect.connectMongo();
app.use(StudentRoute);

app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.PORT}`));
