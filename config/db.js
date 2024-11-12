const mongoose = require("mongoose")
const colors = require("colors")

// mongodb connection
const connectDb = async () => {
  try {
    console.log('Connecting to DB')
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan)
  } catch (error) {
    console.log('DB error --> ', error);
  }
}

module.exports = connectDb