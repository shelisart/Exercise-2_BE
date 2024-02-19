const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: "asset"});
const cors = require('cors');

//1. middleware body parser
app.use(bodyParser.urlencoded({ extended: true})); // parse x-www-form-urlencoded
app.use(bodyParser.json()); // parse JSON
//express ver
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//2. middleware untuk file static
app.use(express.static(path.join(__dirname, "asset")));

//3. middleware untuk file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(req.file);
});

//4. ⁠middleware untuk penanganan CORS
app.use(cors());

app.post('/login', (req, res) =>  {
    const {username, password} = req.body
    res.send(`Anda login dengan username ${username} dan password ${password}`);
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))