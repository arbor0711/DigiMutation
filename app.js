const express = require("express");
const path = require("path");
const app = express();
const Event = require("./models/events");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/digi-mutation")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/events", async (req, res) => {
  const events = await Event.find({});
  res.render("events/index", { events });
});

app.get("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/show", { event });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
