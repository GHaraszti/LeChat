var mongoose = require('mongoose');
// var User = require('./user.js');

var postSchema = mongoose.Schema({
      text: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
      },
      seen: {
            type: Boolean,
            default: false
      },
   //This will become the room data
      convo: {
            type: mongoose.Types.ObjectId,
            ref: "Convo",
            required: true
      },
      sentBy: {
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: true
      },
      sentAt: {
            type: Number,
            default: null
      }
   });

var Post = mongoose.model('Post', postSchema);

module.exports = {Post};
