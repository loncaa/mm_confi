const mongooseConfig = require('../src/config/db-config')
const mongoose = require('mongoose')

mongoose.connect(mongooseConfig.test_url, {useCreateIndex: true, useNewUrlParser: true});

mongoose.connection
    .once('open', () => console.log('DB Connected!'))
    .on("error", err => {
        console.error("MongoDB connection error: " + err);
        process.exit(-1);
    });


function dropWithPromise(collection){
    return new Promise((resolve, reject) => {
        console.log(`Drop collection ${collection}`)
        mongoose.connection.collections[collection].drop(() => {resolve(collection)})
    })
}
//Execute collections drop
before((done) => {
    const promises = []
    for(const collection in mongoose.connection.collections){
        promises.push(dropWithPromise(collection))
    }

    Promise.all(promises)
        .then((response) => {
            console.log('Collections dropped: ' + JSON.stringify(response))
            done()
        })
});