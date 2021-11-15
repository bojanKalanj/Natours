const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (error) => {
  console.log('uncaughtException ERROR: ', error.name, error.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateindex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB CONNECTION SUCCESFULL'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running ot port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection ERROR: ', error);
  server.close(() => process.exit(1));
});
