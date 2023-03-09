const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const Event = require("./models/events");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const { findByIdAndUpdate } = require("./models/events");

mongoose
  .connect("mongodb://127.0.0.1:27017/digi-mutation")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("events/home");
});

app.get("/events", async (req, res) => {
  const events = await Event.find({});
  res.render("events/index", { events });
});

app.get("/events/new", (req, res) => {
  res.render("events/new");
});

app.post("/events", async (req, res) => {
  // befor we can use the req.body we've got to tell Express to parse the body
  // app.use(express.urlencoded({ extended: true }));
  const event = new Event(req.body.event);
  await event.save();
  res.redirect(`/events/${event._id}`);
});

app.get("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/show", { event });
});

app.get("/events/:id/edit", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render("events/edit", { event });
});

app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(
    id,
    { ...req.body.event },
    { new: true }
  );
  res.redirect(`/events/${event._id}`);
});

app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.redirect("/events");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
