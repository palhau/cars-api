const mongoose = require('mongoose');
const { randomUUID } = require('crypto');
const { Schema } = mongoose;

const CarLogSchema = new Schema({
  car_id: { type: String, required: true },
  data_hora : { type: Date, default: Date.now() ,required: true }
});

module.exports = mongoose.model('CarLog', CarLogSchema);


