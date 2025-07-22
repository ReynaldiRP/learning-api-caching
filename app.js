const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');

dotenv.config({
  quiet: true,
});

const { getWeatherData } = require('./controllers/weather.controller');
const { connectRedis } = require('./services/weather.service');

connectRedis();
const express = require('express');
const app = express();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: 'Too many requests, please try again later.',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/weather', getWeatherData);

module.exports = app;
