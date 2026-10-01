const mongoose=require('mongoose')
require('dotenv').config();

async function  ConnectDB(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database Connected successfully.");
    }
    catch(err){
        console.log("Database connection error:",err),
        process.exit(1);
    }
}

module.exports=ConnectDB