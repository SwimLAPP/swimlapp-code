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

// GET '/pools/create' route to show pool creation form to the user
router.get("/create", (req, res, next) => {
  // to render the create form we fetch all pools from the DB
  Pool.find()
    .then((allPools) => res.render("pools/pool-create.hbs", { allPools }))
    .catch((err) => next(err));
});

// POST '/pools/create' route to create a new pool in the DB
router.post("/create", isLoggedIn, (req, res, next) => {
  const { name, address, postalCode, city, poolSize, description, rate } =
    req.body;

  const newPoolDetails = {
    name: name,
    location: {
      address: address,
      postalCode: postalCode,
      city: city,
    },
    poolSize: poolSize,
    description: description,
    rating: rate,
    owner: req.session.currentUser._id,
  };

  Pool.create(newPoolDetails)
    .then(() => res.redirect("/pools"))
    .catch((err) => {
      // res.render("pools/pool-create.hbs");
      console.log("error creating new pool....");
      next(err);
    });
});

// ***** (R)EAD ROUTES *****

// GET '/pools' route to show all pools in a list
router.get("/", (req, res, next) => {
  Pool.find()
    .then((allPools) => res.render("pools/pool-list.hbs", { allPools }))
    .catch((err) => next(err));
});

//// ***** Read /50m
// GET '/pools' route to show all 50m pools in a list
router.get("/50m", (req, res, next) => {
  Pool.find({ $or: [{ poolSize: "50m" }, { poolSize: "both" }] }) // or poolSize: "both"
    .then((allPools) => res.render("pools/list-50m.hbs", { allPools }))
    .catch((err) => next(err));
});

// GET '/pools/:id' route to show details of a specific pool
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.session.currentUser 


  Pool.findById(id)

    .then((onePool) => {
      const isOwner = onePool.owner.toString() === currentUser._id
      res.render("pools/pool-details.hbs", { onePool, isOwner })
    })
    .catch((err) => next(err));
});

//// ***** Read /city
// GET '/:city' route to show all pools in a list by city
// router.get("/:city", (req, res, next) => {
//   Pool.find({ location.city:" })
//     .then((allPools) => res.render("pools/list-by-city.hbs", { allPools }))
//     .catch((err) => next(err));
// });

// ***** UPDATE ROUTES *****

// GET '/pools/:id/edit' route to show the pool edit form to the user
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Pool.findById(id)
    .then((onePool) => {
      res.render("pools/pool-edit.hbs", { onePool });
    })
    .catch((err) => next(err));
});

// POST '/pools/:id/edit' route to edit the movie
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, location, poolSize, description, rating } = req.body;

  Pool.findByIdAndUpdate(id, { name, location, poolSize, description, rating })
    .then(() => res.redirect(`/pools/${id}`))
    .catch((err) => next(err));
});

// ***** DELETE ROUTES *****

// POST '/movies/:id/delete' route to delete a single movie
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Pool.findByIdAndDelete(id)
    .then(() => res.redirect("/pools"))
    .catch((err) => next(err));
});

module.exports = router;
