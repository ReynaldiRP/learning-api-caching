const { getWeatherData } = require('./controllers/weather.controller');
const dotenv = require('dotenv');
dotenv.config({
  quiet: true,
});
const express = require('express');
const app = express();
const port = process.env.PORT;

express.json();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/weather', getWeatherData);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
