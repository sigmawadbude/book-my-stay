const express = require("express");
const users = require("../controller/users.controller");
const r = express.Router();

r.route("/")
    .get(users.getAll);
r.route("/:id")
    .get(users.getById);

module.exports = r;