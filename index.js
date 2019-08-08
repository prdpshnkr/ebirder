const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('./config/db')

const app = express()
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

app.post('/api', (req, res) => {
  console.log(req)
  // const data = req.body;
  // const timestamp = Date.now();
  // data.timestamp = timestamp;
  // database.insert(data);
  // response.json(data);
});















// for heroku
app.use(express.static(path.join(__dirname, "client/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
})
// for heroku

app.listen(port, () => {
  console.log('listening to port', port)
})
