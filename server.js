const app = require('./app');

const dotenv = require('dotenv');

dotenv.config({
  quiet: true,
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
