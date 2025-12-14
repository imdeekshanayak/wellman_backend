module.exports = function(app) {

require('./controllers/event.controller')(app);
require('./controllers/members.controller')(app);
require('./controllers/volunteer.controller')(app);
require("./controllers/contact.controller")(app);
require('./controllers/gallery.controller')(app);
}