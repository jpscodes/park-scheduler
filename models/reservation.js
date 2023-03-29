const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  name: {type: String, required: true},
  feature_desc: { type: String, required: true },
  reservationDate: {type: Date},
  startHour: {},
  endHour: {},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  park: {
    type: Schema.Types.ObjectId,
    ref: 'Park',
    required: true
  }
}, {
  timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);