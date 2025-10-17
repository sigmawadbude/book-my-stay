const app = require('./app');
const mongoose = require('mongoose');
const url = "mongodb://dbAdmin:test1234@localhost:27017/bookmystay";
// Connect to MongoDB
mongoose.connect(url).then((conn) => {
  console.log("Connected to database");
}).catch(err => {
  console.error("Error connecting to database", err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})