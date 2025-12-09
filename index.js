const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors({
  origin: "*", // you can restrict by domain e.g. "http://localhost:4200"
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());

require('./app/config/db.config')(app);
require('./app/routes')(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
