const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

/*------------------------ koneksi database -----------------------------*/
app.get("/students", async (req, res) => {
  try {
    //const result = await db.query("SELECT * FROM students");
    const result = await prisma.students.findMany();
    console.log(result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//GET Student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const idStudent = parseInt(req.params.id);
    const result = await prisma.students.findUnique({
      where: {
        id: idStudent,
      },
    });

    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "Student tidak ditemukan",
      });
    }
    res.status(202).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Interval Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    //    `INSERT into students (name, address) values ('${name}', '${address}')`);
    await prisma.students.create({
      data: {
        name: name,
        address: address,
      },
    });
    res.status(200).json({
      status: "success",
      message: "data berhasil dimasukan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE Student by ID
app.put("/students/:id", async (req, res) => {
  const idStudent = parseInt(req.params.id);
  const { name, address } = req.body;
  try {
    const result = await prisma.students.update({
      where: {
        id: idStudent,
      },
      data: {
        name: name,
        address: address,
      },
    });

    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "Student tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Student berhasil di update!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//DELETE Students by id
app.delete("/students/:id", async (req, res) => {
  const idStudent = parseInt(req.params.id);
  try {
    const result = await prisma.students.delete({
      where: {
        id: idStudent,
      },
    });

    if (!result) {
      return res.status(404).json({
        status: "error",
        message: "Student tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Student berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Interval Server Error");
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
