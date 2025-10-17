const express = require("express");
const hotels = require("../controllers/hotels.controller");
const r = express.Router();

r.route("/")
    .get(hotels.getAll)
    .post(hotels.create);
r.route("/:id")
    .get(hotels.getById)
    .patch(hotels.update)
    .delete(hotels.deleteHotel);

module.exports = r;