const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarLogSchema = new Schema({
  id: { type: String, required: true },
  car_id: { type: String, required: true },
  data_hora : { type: Date, default: Date.now ,required: true }
});

module.exports = mongoose.model('CarLog', CarLogSchema);


