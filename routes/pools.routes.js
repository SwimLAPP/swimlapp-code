const express = require("express");
const router = express.Router();
const Pool = require("../models/Pool.model");

// ℹ️ Handles password encryption
// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
// const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// ***** CREATE ROUTES *****

// GET '/pools/create' route to show movie creation form to the user
router.get("/create", (req, res, next) => {
  // to render the create form we fetch all celebrities from the DB, so we can make the user select which celebrities will be in the cast of the movie
  Pool.find()
    .then((allPools) => res.render("pools/new-pool.hbs", { allPools }))
    .catch((err) => next(err));
});

// POST '/movies/create' route to create a new movie in the DB
router.post("/create", (req, res, next) => {
  const { name } = req.body;

  Pool.create({ name })
    .then(() => res.redirect("/pools"))
    .catch((err) => res.render("pools/new-pool.hbs"));
});

module.exports = router;
