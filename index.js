const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: "asset"});
const cors = require('cors');

//middleware catat log
app.use(morgan('tiny'));

// middleware untuk akses file static
app.use(express.static(path.join(__dirname, "public")));

//middleware body parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//middleware file upload
app.post('/upload', upload.single('unklab'), (req, res) => {
    const file = req.file;
    if (file) {
        const target = path.join(__dirname,"asset", file.originalname);
        fs.renameSync(file.path, target);
        res.send("file berhasil diupload");
    }   else {
        res.send("file gagal diupload");
    }
});

//middleware cors
app.use(cors({
    origin: "http://127.0.0.1:5500",
}));

//penanganan routing 404
const notFound = (req, res, next) => {
    res.json({
        status: 'error',
        message: 'resource tidak ditemukan',
    });
};
app.use(notFound);

//penanganan error
const errorHandling = (err, req, res, next) => {
    res.json({
        status: 'error',
        message: 'terjadi kesalahan pada server',
    });
};
app.use(errorHandling);

//menampilkan list data users
app.get('/users', (req, res) => {
    res.json(users);
});

//memberikan data user sesuai permintaan client
app.get('/users/:name', (req, res) => {
    const {name} = req.params;
    const user = users.find((user) => user.name.toLowerCase() === name.toLowerCase());
    if (!user) {
        return res.status(404).json({
        message: "Data user tidak ditemukan",
        });
    } else {
        res.json(user);
    }
    });
    
// menambahkan record baru
app.post('/users', (req, res) => {
    if(!req.body){
        return res.status(404).json({
            status: "success",
            message: "Masukkan data yang akan diubah",
        });
    }
const newUser = req.body;
users.push(newUser);
res.status(200).json({
    status: "success",
    message: "Record berhasil ditambahkan",
    id: users.length + 1,
    data: newUser,
});
})

// melakukan edit data
app.put("/users/:name", (req, res) => {
    const requestedName = req.params.name.toLowerCase();
    const userIndex = users.findIndex(
      (u) => u.name.toLowerCase() === requestedName
    );
    if (userIndex === -1) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
      });
    }
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Masukkan data yang akan diubah",
      });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.status(200).json({
      status: "success",
      message: "Data berhasil diupdate",
      data: users[userIndex],
    });
  });

// menghapus data  
app.delete('/users/:name', (req, res) => {
    const {name} = req.params.name.toLowerCase();
    const userIndex = users.findIndex((user) => user.name.toLowerCase() === name.toLowerCase());

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Data tidak ditemukan'
        });
    }
    users.splice(userIndex, 1);
    res.status(200).json({
        status: 'success',
        message: 'Data berhasil dihapus'
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))