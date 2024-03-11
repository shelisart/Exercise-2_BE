const express = require("express");
const app = express();
const port = 3000;

const db = require("./db");

app.use(express.json());

/*------------------------ koneksi database -----------------------------*/
app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await db.query(
      `INSERT into students (name, address) values ('${name}', '${address}')`
    );
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
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const result = await db.query(
      `UPDATE students SET name = $1, address = $2 WHERE id = $3`,
      [name, address, id]
    );

    if (result.rowCount === 0) {
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
  const { id } = req.params;
  try {
    const result = await db.query(`DELETE FROM students WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
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

//GET Student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`SELECT * FROM students WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Student tidak ditemukan",
      });
    }
    res.status(202).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Interval Server Error");
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
