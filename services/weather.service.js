const { createClient } = require('redis');
const axios = require('axios');
const client = createClient({
  username: 'default',
  password: 'luLSgIkMDnynaAW1RdsYBi4KaUHxlLlN',
  socket: {
    host: 'redis-18180.c98.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 18180,
  },
});

const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const API_KEY = process.env.API_KEY;

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Redis client connected');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
};

/**
 * Fetches weather data from Visual Crossing API.
 * @param {string} location
 * @returns {Promise<Object>}
 * @throws {Error}
 */
const getWeather = async (location = '') => {
  if (!location) {
    throw new Error('Location is required to fetch weather data');
  }

  const cacheKey = `weather:${location}`;

  try {
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit for location:', cacheKey);
      return JSON.parse(cachedData);
    }

    const response = await axios.get(
      `${BASE_URL}/${encodeURIComponent(location)}`,
      {
        params: {
          unitGroup: 'metric',
          key: API_KEY,
          contentType: 'json',
        },
        timeout: 5000, // Set a timeout of 5 seconds
      }
    );

    const weatherData = response.data;

    const processedData = {
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

    await client.setEx(
      cacheKey,
      process.env.REDIS_CACHE_EXPIRATION || 300,
      JSON.stringify(processedData)
    );

    return processedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = {
  getWeather,
  connectRedis,
};
