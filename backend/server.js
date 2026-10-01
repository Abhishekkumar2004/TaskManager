const app=require('./src/app')
const connectDB=require('./src/config/db');
require('dotenv').config();

connectDB();

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Server is running on the PORT ${PORT}`)
})