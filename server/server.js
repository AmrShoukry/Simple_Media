const { connect } = require('mongoose');
const { config } = require('dotenv');
const { join } = require('path');

config({ path: join(__dirname, 'config.env') });

const app = require(join(__dirname, 'app.js'));
const port = 8000;

const DB = process.env.DATABASE_CONNECTION;

connect(DB, {})
  .then(() => {
    console.log('Connected successfully');
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
