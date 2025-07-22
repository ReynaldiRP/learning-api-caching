const { getWeather } = require('../services/weather.service');

const getWeatherData = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        error: 'Location parameter is required',
        example: '?location=London',
      });
    }

    const weatherData = await getWeather(location);

    res.json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = {
  getWeatherData,
};
