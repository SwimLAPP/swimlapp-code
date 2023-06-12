const mongoose = require("mongoose");
const Pool = require("../models/Pool.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/swimlapp-code";

const pools = [
  {
    name: "MarienBad Brandenburg",
    location: {
      address: "Sprengelstrasse 1",
      postalCode: "14770",
      city: "Brandenburg an der Havel",
    },
    poolSize: "both",
    description:
      "Here you can swim in a 25m and 50m pool or use other wellness services.",
    rating: 8.8,
  },

  {
    name: "Schwimm- und Sprunghalle im Europasportpark (SSE)",
    location: {
      address: "Paul-Heyse-Straße 26",
      postalCode: "10407",
      city: "Berlin - Prenzlauer Berg",
    },
    poolSize: "both",
    description:
      "Olympic, kids' & diving pools are all available at this swimming complex with lessons for all.",
    rating: 8.8,
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    return Pool.deleteMany({}); //WARNING: this will delete all books in your DB !!
  })
  .then((response) => {
    console.log(response);

    return Pool.insertMany(pools);
  })
  .then((poolsFromDB) => {
    console.log(`Created ${poolsFromDB.length} pools`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
