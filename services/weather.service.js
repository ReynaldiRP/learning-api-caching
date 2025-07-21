const axios = require('axios');

/**
 * Fetches weather data from Visual Crossing API.
 * @param {boolean} formatted
 * @returns {Promise<Object>}
 * @throws {Error}
 */
const getWeather = async (formatted = false) => {
  try {
    const response = await axios.get(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-7.2745%2C112.6957?unitGroup=metric&key=YDVNQ8UTTQFCRRRADJTA5WQAL&contentType=json'
    );

    const weatherData = response.data;

    if (formatted) {
      const transformedData = {
        timezone: weatherData.timezone,
        description: weatherData.description,
        days: weatherData.days.slice(0, 3).map((day) => {
          return {
            datetime: day.datetime,
            temp: day.temp,
            conditions: day.conditions,
            description: day.description,
            source: day.source,
          };
        }),
        alerts: weatherData.alerts.map((alert) => {
          return {
            event: alert.event,
            description: alert.description,
          };
        }),
        currentConditions: {
          temp: weatherData.currentConditions.temp,
          conditions: weatherData.currentConditions.conditions,
        },
      };

      return transformedData;
    }

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = {
  getWeather,
};
