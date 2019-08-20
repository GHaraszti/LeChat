require('./config/config');

const path = require('path');
const _ = require('lodash');

const express = require('express');
const cors = require('cors');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const IO = require('socket.io');

const xj = require('express-jwt');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log(__dirname);

//DB initialization
const {mongoose} = require('./db/mongoose');
const {Post} = require('./models/post');
const {User} = require('./models/user');
const {Convo} = require('./models/convo');

const app = express();
// const static = express();

//ENV variables
const port = process.env.PORT || 3000;
const secret = process.env.SECRET || "There is no secret";


//Server secret
const jwtMW = xj({
  secret: secret
});

const socket = IO();

//Validate email
const validEmail = function (email){
  return /.+\@.+\..+/.test(email);
}

//Get convos associated to a user
const getConvos = function(email){
  if(!email || !validEmail(email)) return null;
  
  let user = User.findOne({email: email}).then((user)=>{
    if(user){
      let convos = Convo.find({members: {user: user._id}});
      return convos;
    }
  }).then((convos)=>{
    return convos;
  })
}

//Middleware
app.use(bodyParser.json());

//CORS able
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(
  cors({credentials: true, origin: 'http://localhost:8080'})
);

app.use(function(req, res, next){
  try {
    const pattern = /authToken=(.*?)\;|authToken=(\S*)\b/gm;

    const matches = pattern.exec(req.headers.cookie);
    const token = matches[1] || matches[2];
    jwt.verify(token, secret, function(err, payload){
      if(payload){
        console.log("Hello friend.");
        User.findOne({email: payload.email}).then(
          (doc)=>{
            req.user = doc;
            next();
          }
        )
      } else {
        // res.status(401).json({
        //   redirect: true
        // })
        throw new Error(res.error);
      }
      console.log("Sorry. I don't remember you.");
    })
  } catch(e){
    console.log("Not authenticated.");

    //These routes are allowed to proceed without authentication
    if(req.path == "/login/" || req.path == "/api/users/"){
      req.user = null;
      next();
    } else {
      res.status(401).json({
        redirect: true
      });
    }
    // next(); //Remove after debugging
  }
})

app.use(express.static(__dirname));

// //Token verification
// app.use((req, res, next)=>{
//   try{
//       const token = req.headers.authorization.split(" ")[1]
//       jwt.verify(token, key.tokenKey, function (err, payload) {
//           console.log(payload)
//           if (payload) {
//               user.findById(payload.userId).then(
//                   (doc)=>{
//                       req.user=doc;
//                       next()
//                   }
//               )
//           } else {
//             next()
//           }
//       })
//   }catch(e){
//       next()
//   }

// });

//Authentification middleware


//App middleware


const verifyUser = (token) => {
  if(token){
    let result =
    jwt.verify(token, secret
    //   , function(err, decoded){
    //   if (!err) {
    //     console.log("Oh, it's you!, ", decoded);
    //     result = decoded;
    //   } else {
    //       console.log("Invalid credentials.\n");
    //       return "";
    //   }
    // }
    ); 

    return result;
  } else {
    console.log("No token.");
    return null;
  }
}

app.get('/auth/:token', (req, res, next)=>{
  var token = req.params.token;

  console.log(`Token: ${req.params} \n`);

  //If for some reason client side validation fails and sends no token
  if(!token){
    console.log("Token not defined\n");
    res.status(500).json({success: false});
  }

  //If token isn't valid
  var cert;
  try {
    cert = verifyUser(token);
  } catch(e){
    console.log(e);
  }
  console.log(`Cert: ${cert} \n`);

  if(cert){
    let email = cert.email;
    console.log(`Cert: ${cert} \n`);
  
    User.findOne({email: email}).then((user) => {
      console.log("User: ", user);
      

      // let convos = getConvos(email);
      let convos = user.convos.map((convo)=>{
        return convo;
      });

      console.log("User convos...", convos);
  
      res.status(200).json({
        success: true,
        user: user
      });  
    },
    (err)=>{
      console.log("Can't find user.");
      res.status(401).json({success: false, error: 'Invalid token.'});
    }).catch((e) => {
      console.log("e: ", e)
       res.status(400).json({success: false, error: "Something went wrong"});
    });
    console.log("Still working...");
  } else
  {
    console.log("Wrong password.\n");
    res.status(400).json({success: false, error: "Not valid credentials."});
  }

});

app.post('/login', (req, res) => {
  //{ "_id" : ObjectId("5d251411c54599a46a44ce67"), "email" : "qwe@zxc.com", "name" : "EL", "pw_hash" : "$2a$05$6LY5hQO0sAzIUxyYS7Un6O16XSbkp.bkLNhTLcNf9XVNuul.laVtK", "__v" : 0 }
  console.log("Body: \n", req.body);
  const {email, password} = req.body;

  if(!validEmail(email)) {
    res.status(401).json({
      success: false,
      error: 'Invalid email'
    });
  }

  console.log("Request body: ", req.body);
  console.log("Requesting submitted: ", email, password);

  User.findOne({email: email}).then(

    (user)=>{
      if(user){

        bcrypt.compare(password, user.pw_hash, function(err, result){
          if(result === true){
            console.log("Welcome ", user.name);
            let token = jwt.sign({email: user.email}, secret, {expiresIn: 3600000});
    
            // //Give the user an updated token
            // user.save({token:token}).then(()=>{
            //   console.log("User token updated.");
            // },
            // ()=>{
            //   console.log("User token update failed."); 
            // });
    
            res.status(200).json({
               success: true,
               err: null,
               token,
               user: {
                 email,
                 name: user.name,
                 convos: user.convos
               }
            });
          } else{
            console.log("Password doesn't match with hash");
            res.status(401).json({
              success: false,
              error: 'Entered password and hash do not match'
            });
          }
        })
      }
    
    },
    (reason)=>{
      res.status(400).json({
        success: false,
        error: "A user with that email cannot be found.",
        token: null
      }); 
    }).catch(()=>{
      res.status(500).json({
        success: false,
        error: "Oops, something happened, gimme a sec...",
        token: null
      }); 
    })


  // res.status(400).json({
  //   success: false,
  //   error: "A user with that email cannot be found.",
  //   token: null
  // });

});

app.post('/api/users', (req, res)=>{
  //email validation
  if(false){
    return res.status(404).send();
  }

  bcrypt.hash(req.body.password, 5, function(err, hash){
    var user = new User({
      email: req.body.email,
      name: req.body.name,
      pw_hash: hash
    });
  
    user.save().then((doc)=>{
      res.send(doc);
    }, (e)=>{
      res.status(400).send(e);
    });
  });
});

app.get('/api/user/:email', (req, res) =>{
  var email = req.params.email;

  // if(!ObjectID.isValid(id)) {
  //   return res.status(404).send();
  // }

  //Basic email validation
  if(!email){
    return res.status(400).send();
  } else {
    email = decodeURI(req.params.email);

    //Validate email
    if(false){
      return res.status(404).send();
    }
  }
  console.log(email);

  User.findOne({email: email}).then((user) => {
    if(!user) {
      return res.status(404).send();
    }
    res.status(200).json({name: user.name, email: user.email, _id: user.id});
  }).catch((e) => {
     res.status(400).send();
  });
});

app.post('/api/post/', (req, res) => {
  var email = req.body.sentBy;
  var convoID = req.body.convoID;

  const getThem = async () => {
    let user = await User.findOne({email: email});
    //Temp fixed convoID
    let convo = await Convo.findById(convoID);

    console.log(email);
    if(!user && !convo) {
      return res.status(404).send();
    }
  
    var post = new Post({
      text: req.body.text,
      sentBy: user,
      convo: convo
    });
  
     await post.save().then((doc) => {
        res.status(200).json({doc});
    }, (e) => {
       res.status(400).send(e);
     });
  }

  getThem();
});

//GET all posts from one group/conversation
app.get('/api/posts/:convoID', async (req, res) => {
  let id = req.params.convoID;

  if(!id){
    res.status(500).send("ConvoID not provided.");
  }

  let user = await User.findOne({convos: {_id: id}})

  Post.find({"convo": id}).then((posts) => {
    console.log(posts)
    if(!posts) {
      res.status(404).send("Posts could not be retrieved.");
    } else {
      res.status(200).json({
        posts
      });
    }
  }).catch((e) => {
     res.status(400).send(e);
  });
  console.log("Test page");
});

app.get('api/post/:userID', (req, res) =>{
  //Test user
  //{ "_id" : ObjectId("5d0bd7baa35a0b13f3bb2a89"), "email" : "someone@something.smg", "name" : "Lemoi", "__v" : 0 }

  var id = req.params.userID;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Post.find({sentBy: id}).then((posts) => {
    console.log(posts)
    if(!posts) {
      return res.status(404).send();
    }
    res.send(posts);
  }).catch((e) => {
     res.status(400).send(e);
  });
});

app.delete('api/post/:postID', (req, res) => {
   var id = req.params.postID;

   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
   }

   Post.findByIdAndRemove(id).then((post) => {
         if(!post) {
            return res.status(404).send({deleted:false});
         }
         res.send({post: post, deleted: true});
   }).catch((e) => {
         res.status(400).send(e);
   });
});

//// Message editing not available for now
// app.patch('/posts/:id',(req, res) => {
//    var id = req.params.id;
//    var body = _.pick(req.body, ['text', 'completed']);

//    if(!ObjectID.isValid(id)){
//      return res.status(404).send();
//    }

//    if(_.isBoolean(body.completed) && body.completed) {
//      body.completedAt = new Date().getTime();
//    } else {
//      body.completed = false;
//      body.completedAt = null;
//    }

//    post.findByIdAndUpdate(id, {$set: body}, {new: true}).then((post) => {
//      if(!post)
//      {
//        return res.status(404).send();
//      }

//      res.send({post});
//    }).catch((e) => {
//      res.status(400).send();
//   })
// });

//Convo paths
//var router = express.Router();

// app.param('email', function(req, res, next, email){
//   if(validEmail(email)){
//     req.user= {
//       email: email
//     };
//   } else {
//     req.user= null;
//   }

//   next();
// })

// app.param('convoID', function(req, res, next, id){
//   console.log("PARAM BODY:", req.body);
//   if(!id){
//     req.convo= {
//       id: id,
//       name: req.body.members && "",
//       members: req.body.members && [],
//       isP2P: this.members.length == 2,
//       createdAt: req.body.createdAt && new Date()  
//     };
//   } else {
//     if(ObjectID.isValid(id)) req.id = id;
//   }

//   next();
// })

//Test users

// { "_id" : ObjectId("5d3250f5ecc08368d02a951f"), "email" : "ewq@asd.com", "name" : "Letoi", "pw_hash" : "$2a$05$pNf57iEUuQ7dpyR3scKo1.tScjzfDLS6AFDpDUXEgfDUOJG1wR.d.", "convos" : [ ], "__v" : 0 }
// { "_id" : ObjectId("5d3250ffecc08368d02a9520"), "email" : "qwe@asd.com", "name" : "Lemoi", "pw_hash" : "$2a$05$ocKaduiDcyihF57EtiRuwuXLujqylxzeytAgzfDXzYImNBCKspqsm", "convos" : [ ], "__v" : 0 }

app.route('/api/convos/:email?')
.get(function(req, res, next){
  console.log("GET convos", req.convo);

  var id = req.params.email;

  User.findOne({email: id}).then((user)=>{
    return user;
    //res.status(200).json({doc});
  }).then((user)=>{
    res.status(200).json({success: true, convos: user.convos});
  },
  (reason)=>{
    res.status(400).json({success: false, err: reason});
  })
})////////////////////////////////////
.post(function(req, res, next){

  if(req.body) {
    var memberIDs = req.body.members.length ? req.body.members : [];

    var convo = new Convo({
      name: req.body.name || "",
      members: [],
      isP2P: req.body.members == true && req.body.members.length == 2,
      createdAt: req.body.createdAt || new Date()  
    });
    
    var getUserById = (id) => {
      return new Promise((resolve, reject) => {
        User.findById(id).then((user)=>{
          if(user){
            resolve(user);
          } else {
            reject(user);
          }
        })
      });
    }

    var saveConvoWithMembes = (convo) => {
      return new Promise((resolve, reject) => {
        convo.save().then((err, result)=>{
          if(user){
            resolve(user);
          } else {
            reject(user);
          }
        })
      });
    }

    var getAllMembers = async () => {
      var userQueue = [];
      var users = [];
      
      memberIDs.forEach((element) => {
            userQueue.push(getUserById(element).then((user)=>{
              console.log("User: ", user);
      
              users.push(user);

            }, (reason)=>{
              console.log("reject func", reason);
              //return res.status(400).send(`This is a failure: \n ${reason}`);
            }).catch((e)=>{
              console.log("something bad happened", e);

              //return res.status(500).send(`Exception: \n ${e}`);
            })
            );
      });

      await Promise.all(userQueue).then((results)=>{
        console.log("all resolved ", results);
      },
      (reason) => {
        console.log("Something failed in the promise group.", reason);
      });

      console.log("Final form: users -> ", users)

      return users;
    };

    try{
      getAllMembers().then((users)=>{
        console.log("Users are here.....................", users);
        convo.members = users.map(user=>({user: {_id:user._id, name: user.name, email: user.email}, joinedAt: convo.createdAt}));
        //convo.isP2P = true;
  
        convo.save().then(async (doc)=>{
          await users.forEach(async (user)=>{
            let convos = user.convos.push(doc);
            await user.save({convos: convos});
            console.log(
              "User saved", user
            );
          });
          res.status(200).json({success: true, convo: convo});
        },
        (reason)=>{
          console.log(reason);
          res.status(500).json({success: false, err: reason});
        });
  
        // res.status(200).send(`Everything was OK: \n ${users}`);
  
      },
      (reason)=>{
        console.log(reason);
        res.status(500).json({success: false, err: reason});
      }).catch((err)=>{
        res.status(500).json({success: false, err});
      });
    } catch(e){
      res.status(500).json({success: false, err: e});
    }

  } //End of if(user)

  // return res.status(404).send("Invalid DATA.");
});

//
// app.post('/convos', (req, res) => {
//   var id = req.body.sentBy;

//   console.log(id);
//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   var post = new Post({
//     text: req.body.text,
//     sentBy: id
//   });

//    post.save().then((doc) => {
//      res.send(doc);
//    }, (e) => {
//      res.status(400).send(e);
//    });
// });

 
// app.get('/convos/:userID', (req, res) =>{
//   //Test user
//   //{ "_id" : ObjectId("5d0bd7baa35a0b13f3bb2a89"), "email" : "someone@something.smg", "name" : "Lemoi", "__v" : 0 }
//   var id = req.params.userID;

//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Post.find({sentBy: id}).then((posts) => {
//     console.log(posts)
//     if(!posts) {
//       return res.status(404).send();
//     }
//     res.send(posts);
//   }).catch((e) => {
//      res.status(400).send(e);
//   });
// });

app.get('*', function(req, res){
  console.log("No route found.");
  //res.redirect("/");
}); 


app.listen(port, () => {
   console.log(`Started on port ${port}`);
});

// static.listen(8080, () => {
//   console.log('Started static server');
// })

module.exports = {app};
