# Weather API with Redis Caching

A Node.js Express API that fetches weather data from Visual Crossing Weather API with Redis caching for improved performance and reduced API calls.

## Features

- **Weather Data Retrieval**: Get current weather and 3-day forecast for any location
- **Redis Caching**: Automatic caching with 5-minute expiration to reduce API calls
- **Rate Limiting**: Built-in rate limiting (5 requests per 5 minutes)
- **Error Handling**: Comprehensive error handling for API and cache failures
- **Environment Configuration**: Secure API key and configuration management

## Tech Stack

- **Backend**: Node.js with Express.js
- **Cache**: Redis Cloud
- **HTTP Client**: Axios
- **Environment**: dotenv
- **Rate Limiting**: express-rate-limit

## Prerequisites

- Node.js (v14 or higher)
- Redis instance (local or cloud)
- Visual Crossing Weather API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ReynaldiRP/learning-api-caching.git
cd learning-api-caching
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
API_KEY=your_visual_crossing_api_key
REDIS_CACHE_EXPIRATION=300
```

4. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get Weather Data

```
GET /weather?location={location_name}
```

**Parameters:**

- `location` (required): City name or location (e.g., "London", "New York")

**Example Request:**

```bash
curl "http://localhost:3000/weather?location=London"
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "timezone": "Europe/London",
    "description": "Partly cloudy throughout the day.",
    "days": [
      {
        "datetime": "2025-07-22",
        "temp": 22.5,
        "conditions": "Partly Cloudy",
        "description": "Partly cloudy throughout the day.",
        "source": "obs"
      }
    ],
    "alerts": [],
    "currentConditions": {
      "temp": 22.5,
      "conditions": "Partly Cloudy"
    }
  }
}
```

### Root Endpoint

```
GET /
```

Returns a simple "Hello World!" message.

## Caching Strategy

- **Cache Key Format**: `weather:{location}:formatted`
- **Cache Duration**: 5 minutes (300 seconds)
- **Cache Hit**: Returns cached data instantly
- **Cache Miss**: Fetches from Visual Crossing API and caches the result

## Rate Limiting

- **Limit**: 5 requests per 5 minutes per IP
- **Response**: 429 status with "Too many requests" message when exceeded

## Error Handling

The API handles various error scenarios:

- **400 Bad Request**: Missing location parameter
- **401 Unauthorized**: Invalid or missing API key
- **404 Not Found**: Location not found
- **408 Timeout**: API request timeout
- **500 Internal Server Error**: General server errors

## Project Structure

```
learning-api-caching/
├── controllers/
│   └── weather.controller.js    # Request handling logic
├── services/
│   └── weather.service.js       # Weather API and cache logic
├── app.js                       # Express app configuration
├── server.js                    # Server startup
├── package.json                 # Dependencies and scripts
├── .env                         # Environment variables
└── README.md                    # Project documentation
```

## Redis Configuration

The project uses Redis Cloud with the following configuration:

- **Host**: `redis-18180.c98.us-east-1-4.ec2.redns.redis-cloud.com`
- **Port**: `18180`
- **Authentication**: Username/password based

## Scripts

- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests (not implemented yet)

## Environment Variables

| Variable                 | Description                     | Default       |
| ------------------------ | ------------------------------- | ------------- |
| `NODE_ENV`               | Environment mode                | `development` |
| `PORT`                   | Server port                     | `3000`        |
| `API_KEY`                | Visual Crossing Weather API key | Required      |
| `REDIS_CACHE_EXPIRATION` | Cache expiration in seconds     | `300`         |

## Development Notes

### Cache Flow

1. Client requests weather data for a location
2. Check Redis cache for existing data
3. If cache hit: Return cached data
4. If cache miss: Fetch from Visual Crossing API
5. Process and format the response
6. Store in Redis cache with expiration
7. Return data to client

### Error Recovery

- Redis connection failures don't break the API
- Graceful fallback to direct API calls when cache is unavailable
- Comprehensive logging for debugging

## API Provider

This project uses [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for weather data.

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## Future Enhancements

- [ ] Add unit tests
- [ ] Implement cache invalidation endpoints
- [ ] Add weather data validation
- [ ] Support for multiple weather providers
- [ ] Database integration for historical data
- [ ] Docker containerization
