const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((data) => {
            console.log(`mongodb connected with server: ${data.connection.host}`);
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;