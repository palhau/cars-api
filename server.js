const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

const mongoose = require('mongoose');
const routes = require('./app/controllers/index');
const dbConfig = require('./config/database.config.js');
const { createdCarsQueue } = require('./app/queues/createdCars.js');

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Sucessfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to BHUT Cars Middleware.' });
});

app.listen(3000, () => {
  createdCarsQueue.process(async (job) => {
    return app.post('/hook').send({
      id: job.data.id,
    });
  });
  console.log('Server is listening on port 3000');
});

require('./app/routes/routes.js')(app);
