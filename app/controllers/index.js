const CarLog = require('../models/index.js');
const { createdCarsQueue } = require('../queues/createdCars.js');

module.exports.create = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: 'Form content can not be empty',
    });
  }
  try {
    const fetch = (await import('node-fetch')).default;

    const postData = JSON.stringify({
      title: req.body.title,
      brand: req.body.brand,
      price: req.body.price,
      age: req.body.age,
    });

    console.log(postData);

    const response = await fetch('http://api-test.bhut.com.br:3000/api/cars', {
      method: 'POST',
      body: postData,
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    const carLog = new CarLog({
      car_id: data._id,
      data_hora: Date.now(),
    });

    createdCarsQueue.add({ ...postData, id: data._id });

    return carLog
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || 'Some error ocurred while creating the car log.',
        });
      });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error ocurred while creating the car.',
    });
  }
};

module.exports.list = async (_req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('http://api-test.bhut.com.br:3000/api/cars');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error ocurred while getting the car list.',
    });
  }
};

module.exports.logs = (_req, res) => {
  CarLog.find({})
    .then((log) => {
      res.json(log);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error ocurred while retrieving the logs.',
      });
    });
};

module.exports.queueHook = (_req, res) => {
  try {
    res.json({
      message: 'Car Created Successfully',
      id: req.body.id,
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error ocurred while sending the message.',
    });
  }
};
