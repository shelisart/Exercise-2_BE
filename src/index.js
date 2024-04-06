const express = require("express");
const app = express();
const port = 3000;
const db = require("../db");

app.use(express.json());

const studentController = require("./student/student.controller");

app.use("/student", studentController);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
