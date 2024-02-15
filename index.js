const express = require('express');
const morgan = require('morgan');
const users = require('./users'); 
const app = express();
const port = 3000;


app.use(morgan('dev'));

//deklarasi routing
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:name', (req, res) => {
    const requestedName = req.params.name.toLowerCase();
    const user = users.find(u => u.name.toLowerCase() === requestedName);
    if (!user) {
        res.json({
        message: "Data user tidak ditemukan",
        });
    } else {
        res.json(user);
    }
    });
    

    //middleware penanganan routing 404

const notFound = (req, res, next) => {
    res.json({
        status: 'error',
        message: 'resource tidak ditemukan',
    });
};
app.use(notFound);

//middleware penanganan error
      
const errorHandling = (err, req, res, next) => {
    res.json({
        status: 'error',
        message: 'terjadi kesalahan pada server',
    });
};
app.use(errorHandling);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));