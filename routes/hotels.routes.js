const express = require("express");
const hotels = require("../controller/hotels.controller");
const r = express.Router();

r.route("/")
    .get(hotels.getAll)
    .post(hotels.validateBody, hotels.create);
r.route("/:id")
    .get(hotels.getById)
    .patch(hotels.update)
    .delete(hotels.deleteHotel);

module.exports = r;