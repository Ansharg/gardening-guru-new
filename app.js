const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config()
const routerplant = require("./routes/Plant");
const routerauth = require("./routes/Auth");
const session = require("express-session");
const MemoryStore = require('memorystore')(session)

app.use(session({
    secret: 'secret',
    resave: false,
    // saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  }));

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/", routerauth);
app.use("/", routerplant);

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    app.listen(3000, () => {
      console.log("Server is running at port 3000");
    });
  });
