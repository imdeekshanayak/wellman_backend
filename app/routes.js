module.exports = function(app) {

require('./controllers/event.controller')(app);
require('./controllers/members.controller')(app);
require('./controllers/volunteer.controller')(app);
}