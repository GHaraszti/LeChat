require('./config/config');

const path = require('path');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var hbs = require('hbs');

var {mongoose} = require('./db/mongoose');
var {Convo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../views')));
console.log(__dirname);

app.get('/', (req, res) => {
  if(req.auth){
    res.render('login.hbs');
  } else {
    res.render('login.hbs');
  }
});

app.post('/', (req, res) => {
  if(req.auth){
    res.send('ho');
  } else {
    res.render('index.hbs', {
      
    });
    console.log('There i posted back');
  }
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
         text: req.body.text
   });

   todo.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
         res.send({todos});
   }, (e) => {
         res.status(400).send(e);
   });
});

//GET /todos/12345
app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
     res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
   }

   Todo.findByIdAndRemove(id).then((todo) => {
         if(!todo) {
               return res.status(404).send();
         }
         res.send({todo});
   }).catch((e) => {
         res.status(400).send();
   });
});

app.patch('/todos/:id',(req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }

   if(_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
   } else {
     body.completed = false;
     body.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
     if(!todo)
     {
       return res.status(404).send();
     }

     res.send({todo});
   }).catch((e) => {
     res.status(400).send();
  })
});

app.listen(port, () => {
   console.log(`Started on port ${port}`);
});

module.exports = {app};
