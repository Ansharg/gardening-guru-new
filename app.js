const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routerplant = require("./routes/Plant");
const routerauth = require("./routes/Auth");
const session = require("express-session");

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if you are using HTTPS
  }));

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/", routerauth);
app.use("/", routerplant);

mongoose.connect("mongodb+srv://anshgarg94161:FNXU6wQid4fIz08Q@gardeningguru.rmzl7.mongodb.net/?retryWrites=true&w=majority&appName=gardeningguru",
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    app.listen(3000, () => {
      console.log("Server is running at port 3000");
    });
  });
