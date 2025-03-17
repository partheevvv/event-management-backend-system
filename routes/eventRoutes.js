const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createTicket,
  registerForEvent,
  getRegistrations,
  getNotifications
} = require('../controllers/eventController');

// Event routes
router.post('/events', auth, createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', auth, updateEvent);
router.delete('/events/:id', auth, deleteEvent);

// Ticket routes
router.post('/events/:eventId/tickets', auth, createTicket);

// Registration routes
router.post('/registrations', auth, registerForEvent);
router.get('/registrations', auth, getRegistrations);

// Notification routes
router.get('/notifications', auth, getNotifications);

module.exports = router;