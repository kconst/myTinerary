const express = require("express");
const router = express.Router();

// @route   GET api/cities/test
// @desc    Tests cities route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Cities Works" }));

// Load City model
const User = require("../../models/City");

// @route   GET api/cities/register
// @desc    Register city
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ name: req.body.name }).then(cityName => {
    User.findOne({ country: req.body.country }).then(cityCountry => {
      if (cityName && cityCountry) {
        return res.status(400).json({
          name: "City already exists in such Country.",
          city: cityName
        });
      } else {
        const newCity = new City({
          name: req.body.name,
          country: req.body.country
        });

        newCity
          .save()
          .then(cityName => res.json(cityName))
          .catch(err => console.log(err));
      }
    });
  });
});

// @route   GET api/cities/all
// @desc    Get all cities
// @access  Public
router.get("/all", (req, res) => {
  const cities = [];
  const newCity = new City();
  City.find()
    .sort({ name: 1 })
    .sort({ country: 1 })
    .then(cities => {
      res.json(cities).catch((err = res.status(404)));
    });
});

module.exports = router;
