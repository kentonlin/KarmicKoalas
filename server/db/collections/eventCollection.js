const db = require('../config');
const Event = require('../models/event'); 

const Events = new db.Collection();

Events.model = Event;

module.exports = Events;
