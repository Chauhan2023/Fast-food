const express = require("express");
const app = express();
const port = 80;
const cors = require('cors');
const connectToMongoDB = require('./db');
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Connect to MongoDB and start the server only after successful connection
connectToMongoDB()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });


app.use(express.json());


app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/loginuser"));
app.use('/api', require("./Routes/Myorder"));





