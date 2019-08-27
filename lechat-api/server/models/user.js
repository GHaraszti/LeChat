var mongoose = require('mongoose');
var {Convo} = require("./convo");

// var Convos = new mongoose.Schema({
//       user: {
//             type: mongoose.Types.ObjectId,

//       },
// })

var userSchema = new mongoose.Schema({
      email: {
            type: String,
            index: true,
            unique: true,
            required: true,
            trim: true,
            minlength: 1
      },
      name: {
            type: String,
            required: true,
            trime: true,
            minlength: 1
      },
      pw_hash: {
            type: String,
            required: true,
            trime: true
      },
      convos: [{
            type: mongoose.model("Convo").schema,
            ref: "User"
      }]
   });

var User = mongoose.model('User', userSchema);

// User.collection.createIndex({email:1}, {unique: true}).then(
//       ()=>{
//             User.collection.getIndexes().then((doc)=>{
//                   console.log("Indexes: \n", doc);
//             });
//       }
// );


User.collection.getIndexes().then((doc)=>{
      if(doc.email_1 == undefined){
            console.log("Creating [email] indexes.");
            User.collection.createIndex({email:1}, {unique: true}).then(
                  ()=>{
                        User.collection.getIndexes().then((doc)=>{
                              console.log("Indexes: \n", doc);
                        });
                  }
            );
      } else {
            console.log("[Email] index exists. Indexes: ", doc);
      }
});

// User.collection.dropIndexes().then((doc)=>{
//       User.collection.getIndexes().then((docs)=>console.log(docs));
// });

//Test user
//5d0bd7cda35a0b13f3bb2a8a
//{ "_id" : ObjectId("5d251411c54599a46a44ce67"), "email" : "qwe@zxc.com", "name" : "EL", "pw_hash" : "$2a$05$6LY5hQO0sAzIUxyYS7Un6O16XSbkp.bkLNhTLcNf9XVNuul.laVtK", "__v" : 0 }

module.exports = {User};
