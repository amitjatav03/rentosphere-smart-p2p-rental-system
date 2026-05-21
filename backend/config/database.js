const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected Successfully');

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = dbConnect;