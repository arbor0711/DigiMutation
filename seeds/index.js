const Event = require("../models/events");
const mongoose = require("mongoose");
const conferences = require("./conferences");
const images = require("./images");

mongoose
  .connect("mongodb://127.0.0.1:27017/digi-mutation")
  .then(() => console.log("Mongo Connection Open."))
  .catch((err) => {
    console.log("!!!Mongo Connection ERROR!!!");
    console.log(err);
  });

for (let conference of conferences) {
  let imgNumber = Math.floor(Math.random() * images.length);
  let img = `${imgNumber}`;
  conference.image = images[img];
}

const seedDB = async () => {
  await Event.deleteMany({});
  await Event.insertMany(conferences);
};

seedDB().then(() => {
  mongoose.connection.close();
});
