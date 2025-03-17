const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const Registration = require('../models/Registration');
const Notification = require('../models/Notification');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user.id });
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({ ...req.body, eventId: req.params.eventId });
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const registration = new Registration({
      ...req.body,
      user: req.user.id
    });
    await registration.save();
    res.status(201).send(registration);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get single event
exports.getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('organizer', 'name email');
      if (!event) return res.status(404).send();
      res.send(event);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      organizer: req.user.id
    });
    if (!event) return res.status(404).send();
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get user registrations
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event')
      .populate('ticket');
    res.send(registrations);
  } catch (error) {
    res.status(500).send(error);
  }
};