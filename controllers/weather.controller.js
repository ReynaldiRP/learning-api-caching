const { getWeather } = require('../services/weather.service');

const getWeatherData = async (req, res) => {
  try {
    const weatherData = await getWeather();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = {
  getWeatherData,
};
