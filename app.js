const { getWeatherData } = require('./controllers/weather.controller');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/weather', getWeatherData);

module.exports = app;
