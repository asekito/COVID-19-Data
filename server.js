const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/api", async (req, res) => {
  await axios
    .get("https://covidtracking.com/api/states")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app

app.listen(3111);
