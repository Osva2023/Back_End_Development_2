const mongoose = require('mongoose');
require('dotenv').config();
const mongoDBURL = require('./api')
const openMongoConnection = () => {
   
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('connected to MongoDB');
    });
    mongoose.connect(mongoDBURL);
};

mongoose.set('strictQuery', true)

module.exports = {openMongoConnection};



//'mongodb+srv://elosvadel84:Rocket_Mongo@cluster0.vj3lwcc.mongodb.net/Rocket_Elevators?retryWrites=true&w=majority')