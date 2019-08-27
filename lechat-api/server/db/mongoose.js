var mongoose = require('mongoose');

mongoose.set('debug', true);

//let mongoose_uri = "mongodb://172.17.0.13:27017/LeChatAPI"

mongoose.Promise = global.Promise;
console.log("Connecting mongoose to: ", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then((result)=>{
    console.log("Mongoose connected: ", result);
},
(reason)=>{
    console.log("Connection failed: ", reason);
});

module.exports = {mongoose};
