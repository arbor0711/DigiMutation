const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    name: String,
    description: String,
    location: String,
    date: String,
    category: String,
    type: String,
    link: String,
    organizer: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventsSchema);
