const Queue = require('bull');

module.exports.createdCarsQueue = new Queue("createdCars");