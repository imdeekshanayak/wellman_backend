module.exports = function(app) {

require('./controllers/event.controller')(app);
require('./controllers/members.controller')(app);
require('./controllers/volunteer.controller')(app);
require("./controllers/contact.controller")(app);
require('./controllers/gallery.controller')(app);
require("./controllers/galleryimage.controller")(app);
require('./controllers/certification.controller')(app);
require('./controllers/videos.controller')(app);
require("./controllers/contribution.controller")(app);
require("./controllers/services.controller")(app);
}