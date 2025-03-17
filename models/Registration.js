const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' }
});

// Trigger to update ticket quantity after registration
registrationSchema.post('save', async function(doc) {
  const ticket = await mongoose.model('Ticket').findById(doc.ticket);
  ticket.quantityAvailable -= 1;
  await ticket.save();
  
  // Create notification
  await mongoose.model('Notification').create({
    user: doc.user,
    message: `You have successfully registered for ${(await mongoose.model('Event')
      .findById(doc.event)).title}`
  });
});

module.exports = mongoose.model('Registration', registrationSchema);