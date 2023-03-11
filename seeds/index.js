const Event = require("../models/events");
const mongoose = require("mongoose");
const conferences = require("./conferences");
const images = require("./images");
const { indexOf } = require("./conferences");

mongoose
  .connect("mongodb://127.0.0.1:27017/digi-mutation")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

let i = 0;
for (let conference of conferences) {
  while (i < conferences.length) {
    i++;
    console.log(images[i]);
    conference.image = images[i];
    break;
  }
}

const seedDB = async () => {
  await Event.deleteMany({});
  await Event.insertMany(conferences);
};

seedDB().then(() => {
  mongoose.connection.close();
});
