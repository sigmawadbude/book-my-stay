const express = require("express");
const fs = require("fs");
const path = require("path");
const hotelController = require("./controller/hotelsController");

const app = express();

app.use(express.json());

app.route("/api/v1/hotels")
    .get(hotelController.getAll)
    .post(hotelController.create);
app.route("/api/v1/hotels/:id")
    .get(hotelController.getById)
    .patch(hotelController.update)
    .delete(hotelController.deleteHotel);

module.exports = app;
