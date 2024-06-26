const mongoose = require('mongoose');
require('dotenv').config();

const openMongoConnection =  () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('Connected to MongoDB');
    });
    mongoose.connect('mongodb+srv://elosvadel84:Rocket_Mongo@cluster0.3onlzhi.mongodb.net/Rocket_Elevators?retryWrites=true&w=majority')
};
mongoose.set('strictQuery', true)
module.exports = { openMongoConnection };
