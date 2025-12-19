const mongoose = require('mongoose');

const connectDB =  async () => {
    await mongoose.connect("mongodb+srv://theyahir01_db_user:dM31rGtm4HmESg5s@namastenodejs.d8xfibe.mongodb.net/devTinder");
}

module.exports = connectDB;