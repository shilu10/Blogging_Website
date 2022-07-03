const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });  
          console.log(`MongoDB connected: ${connection.connection.host}`);
          return connection;
        } 
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
module.exports = {
    connectDB
}

