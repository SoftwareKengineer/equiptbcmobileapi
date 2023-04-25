const express = require('express')
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('equiptbcmobileapi', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World !')
})

app.listen(3000)