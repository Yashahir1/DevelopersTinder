const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB =  async () => {
    await mongoose.connect("mongodb+srv://theyahir01_db_user:yash448@namastenodejs.d8xfibe.mongodb.net/devTinder");
}

module.exports = connectDB;