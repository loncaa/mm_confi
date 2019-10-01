const mongooseConfig = require('../src/config/db-config')
const mongoose = require('mongoose')

mongoose.connect(mongooseConfig.test_url, {useCreateIndex: true, useNewUrlParser: true});

mongoose.connection
    .once('open', () => console.log('DB Connected!'))
    .on("error", err => {
        console.error("MongoDB connection error: " + err);
        process.exit(-1);
    });

//Execute collections drop
before((done) => {
    for(const collection in mongoose.connection.collections){
        mongoose.connection.collections[collection].drop(() => {})
    }

    console.log('Collections dropped')
    done()
});