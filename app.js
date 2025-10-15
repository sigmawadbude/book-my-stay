const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

let hotels = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/hotels.json"))
);

/**
 * @swagger
 * /api/v1/hotels:
 *   get:
 *     summary: Get all hotels.
 *     description: Retrieve a list of all available hotels.
 *     responses:
 *       200:
 *         description: A successful response with the list of hotels.
 */
app.get("/api/v1/hotels", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      hotels,
    },
  });
});

module.exports = app;
