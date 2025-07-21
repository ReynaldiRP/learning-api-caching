const axios = require('axios');

const getWeather = async () => {
  try {
    const response = await axios.get(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-7.2745%2C112.6957?unitGroup=metric&key=YDVNQ8UTTQFCRRRADJTA5WQAL&contentType=json'
    );

    // Transform the response data
    const weatherData = response.data;
    const transformedData = {
      timezone: weatherData.timezone,
      description: weatherData.description,
      days: weatherData.days.slice(0, 3).map((day) => {
        return {
          datetime: day.datetime,
          temp: day.temp,
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
      },
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = {
  getWeather,
};
