const express = require("express");
const app  = express();
PORT = 3000;




app.use(express.json())



require('./app/routes')(app);
require('./app/config/db.config')(app);
// require('./middleware/upload.middleware')(app);


app.listen(PORT, ()=>{
    console.log("hello server is created ")
});