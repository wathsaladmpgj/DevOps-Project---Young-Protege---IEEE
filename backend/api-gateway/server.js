const app = require('./src/app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`API gateway running on port ${port}`);
});