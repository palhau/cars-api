const CarLog = require('../models/index.js');
const { randomUUID } = require('crypto');
const http = require('http');

const { createdCarsQueue } = require('../queues/createdCars.js');

module.exports.create = (req, res) => {
  let data = '';

  // Validade request
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: 'Form content can not be empty',
    });
  }

  const postData = JSON.stringify({
    _id: req.body._id,
    title: req.body.title,
    brand: req.body.brand,
    price: req.body.price,
    age: req.body.age,
  });

  const CreateCarOptions = {
    hostname: 'http://api-test.bhut.com.br:3000/api',
    path: '/cars',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const request = http.request(CreateCarOptions, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const carLog = new CarLog({
        id: randomUUID,
        car_id: data._id,
        data_hora: Date.now,
      });

      createdCarsQueue.add({ ...postData });

      return carLog
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error ocurred while creating the driver.',
          });
        });
    });
  });

  request.on('error', (error) => {
    console.error(error);
  });

  request.end();
};

module.exports.list = (_req, res) => {
  let data = '';

  const CreateCarOptions = {
    hostname: 'http://api-test.bhut.com.br:3000/api',
    path: '/cars',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const request = http.request(CreateCarOptions, (response) => {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.json(data);
    });
  });

  request.on('error', (error) => {
    console.error(error);
  });

  request.end();
};

module.exports.logs = (_req, res) => {
  CarLog.find({})
    .then((log) => {
      res.json(log);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || 'Some error ocurred while retrieving the drivers.',
      });
    });
};

module.exports.queueHook = (_req, res) => {
  res.json({
    message:
      'Car Created Successfully',
  });
};
