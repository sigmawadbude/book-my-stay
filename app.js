const express = require("express");
const fs = require("fs");
const path = require("path");
const hotelController = require("./controller/hotelsController");

const app = express();

app.use(express.json());



app.get("/api/v1/hotels", hotelController.getAllHotels);

app.post("/api/v1/hotels", hotelController.createHotel);



module.exports = app;
