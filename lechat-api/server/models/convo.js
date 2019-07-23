var mongoose = require('mongoose');
// var User = require('./user.js');

var convoSchema = mongoose.Schema({
    name: {
         type: String,
         required: true,
         trim: true
    },
    //Subdocument related to convo members and relevant info
    members: [{
         user:{
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: true
        },
        joinedAt: {
          type: Number,
          required: true
        }
    }],
    createdAt: {
        type: Number,
        required: true
    },
    isP2P: {
        type: Boolean,
        required: true
    }
});

var Convo = mongoose.model('Convo', convoSchema);

module.exports = {Convo};
