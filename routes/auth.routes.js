const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User.model");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, (req, res) => {
  const { email, password } = req.body;

  // Check that email and password are provided
  if (!email === "" || !password === "") {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your email and password.",
    });

    return;
  }

  if (password.length < 8) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });

    return;
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Create a new user - start by hashing the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      return User.create({ email, password: hashedPassword });
    })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "The email needs to be unique. Provide a valid email address.",
        });
      } else {
        next(error);
      }
    });
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
      res.status(400).render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
      return;
  }

  User.findOne({email: email})
      .then( user => {
          if (!user) {
              //user doesn't exist (mongoose returns "null")
              res.status(400).render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
              return;
          } else if (bcryptjs.compareSync(password, user.passwordHash)){
              //login successful
              req.session.currentUser = user; // store info in req.session (will be available in further requests)
              res.render("auth/user-profile", {userDetails: user});
          } else {
              //login failed
              res.status(400).render('auth/login', { errorMessage: 'Incorrect credentials.' });
          }
      })
      .catch(error => {
          console.log("error trying to login...", error);
          next(error);
      });

});

router.post("/logout", (req, res, next) => {
  req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/'); // if logout successful, redirect to homepage
  });
})

//GET user-profile
router.get('/user-profile', (req, res) => {
  res.render("auth/user-profile", {userDetails: req.session.currentUser});
});


module.exports = router;

