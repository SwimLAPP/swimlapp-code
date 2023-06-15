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
      "Here you can swim in a 25m and 50m pool. Wellness services available",
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

  {
    name: "Olympiapark Schwimmstadion Berlin",
    location: {
      address: "Olympischer Platz 3",
      postalCode: "14053",
      city: "Berlin - Charlottenburg",
    },
    poolSize: "50m",
    description:
      "Diving facility with 1 and 3 m springboards and 5, 7.5 and 10 m platforms",
    rating: 7,
  },

  {
    name: "Bäderland swimming pool Island Park",
    location: {
      address: "Kurt-Emmerich-Platz 12",
      postalCode: "21109",
      city: "Hamburg",
    },
    poolSize: "50m",
    description:
      "The Inselpark swimming pool is particularly inviting with its modern ambience. The new building from 2013 is located in the middle of the island park created for the international garden show and opens up a view of well-kept green areas through a generous glass front. The 25-meter multi-purpose pool behind it offers plenty of space for sporty swimming. The courses offered in the course pool, which is equipped with massage jets, ensure even more exercise. Even the little ones can let off steam in the children's pool. A highlight in summer is the south facade that can be opened. It brings an outdoor pool feeling into the bathroom and offers access to the outdoor area with terrace.",
    rating: 8.9,
  },
  {
    name: "Wildorado",
    location: {
      address: "Jahnstrasse 30",
      postalCode: "15745",
      city: "Wildau",
    },
    poolSize: "25m",
    description: "Swim, workout, and wellness in one place",
    rating: 7,
  },
  {
    name: "Piscine Aquasud",
    location: {
      address: "Avenue d'Italie",
      postalCode: "47000",
      city: "Agen",
    },
    poolSize: "both",
    description:
      "La piscine olympique Aquasud à Agen est équipée d’un bassin de 50 m, d’un bassin de 25 m, d’une aire de jeux aqualudique pour les enfants, d’espaces verts, d’une zone pique-nique et de tables de ping-pong.",
    rating: 4.9,
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
