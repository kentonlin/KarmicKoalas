const db = require('../config');
const Route = require('../models/route'); 

const Routes = new db.Collection();

Routes.model = Route;

module.exports = Routes;
