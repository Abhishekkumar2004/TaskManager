const mongoose = require('mongoose');
require('dotenv').config();

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Database connected successfully.');
    } catch (err) {
        console.error('Database connection error:', err);
        throw err;
    }
}

module.exports = ConnectDB;