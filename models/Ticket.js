const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);