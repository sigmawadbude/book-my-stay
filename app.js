const express = require("express");
const hotelsRouter = require("./routes/hotels.routes");
const userRouter = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/hotels", hotelsRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
