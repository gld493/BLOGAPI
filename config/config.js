
const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         } );
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}



module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    token_secret: process.env.TOKEN_SECRET,
    dbconn: connectDB()
 };
 