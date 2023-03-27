const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
  name: {type: String, required: true},
  feature_desc: [{ type: String }],
  hours: { type: String }
}, {
  timestamps: true,
  }
);

module.exports = mongoose.model('Park', parkSchema);