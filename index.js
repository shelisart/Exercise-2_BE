const moment = require('moment');
const express = require('express');
const members = require('./members');
const users = require('./users')
const app = express();
const morgan = require('morgan');
const port = 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => res.send('This is the Homepage'));

app.get('/about', (req, res) => res.json({
    Status: 'success',
    Message: 'response success',
    Description: 'Exercise 02',
    Date: moment().format(),
    Data: members,
}));

app.get('/users', (req,res) => res.json(users));

app.listen(port, () =>
    console.log(`Service running at http://localhost:${port}`)
);
  