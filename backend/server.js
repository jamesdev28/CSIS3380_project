const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

const uri = "mongodb+srv://dungnguyen45575:12345@cluster0.s0muid4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
const mealRouter = require('./routes/meals');
app.use('/meals', mealRouter);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});