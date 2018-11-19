const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const cities = require("./routes/api/cities");
const mytineraries = require("./routes/api/mytineraries");
const activities = require("./routes/api/activities");

const app = express();

app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB // TODO ensure this piece of code is always executed.
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("HELLO WORLD"));

app.get("/", (req, res) => {
  Item.find()
    .then(items => res.render("index", { items }))
    .catch(err => res.status(404).json({ msg: "No items found" }));
});

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/cities", cities);
app.use("/api/mytineraries", mytineraries);
app.use("/api/activities", activities);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
