const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://ebirder:ebirder@ebirder-py4bp.mongodb.net/test?retryWrites=true&w=majority"
mongoose
  .connect(CONNECTION_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("mongodb-atlas connected succesfully");
  })
  .catch(err => {
    console.log("Error connecting to DB", err);
  });

module.exports = mongoose
