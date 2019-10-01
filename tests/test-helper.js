const mongooseConfig = require('../src/config/db-config')
const mongoose = require('mongoose')

mongoose.connect(mongooseConfig.test_url, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on("error", err => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
});

//Execute database drop when it is open
beforeEach((done) => {
    mongoose.connection.on("open", () => {
        mongoose.connection.collections[mongooseConfig.test_db_name].drop(() => {
            //When it's dropped execute next test
            done();
        });
    })
});