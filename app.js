var express = require('express');
// var mongoose = require('mongoose')
var axios = require('axios')
var app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());

app.use('/static', express.static("public"));
app.set("view engine", "ejs");
const Todo = require('./models/todo.model');
// const mongoDB = 'mongodb+srv://candies_amanda:Ndx2dZV7I5rUTaJv@cluster0.godqah8.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console,"MongoDb connection error: "))


app.get('/', function(req, res){
    let comicData = {}
    axios.get('https://xkcd.com/614/info.0.json').then(function(response){
    Todo.find(function(err, todo){
      console.log(todo)
      if(err){
          res.json({"Error: ": err})
      } else {
          res.render('todo.ejs', {todoList: todo, comicData: response.data});
      }
  })
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  console.log(getRandomInt(2682));
  // expected output: Random number between 1 and 2682
 
}).catch(function(error){
    res.json({"Error: ": error})
  })
    
})


app.listen(3000, function(){
    console.log('App listen on port 3000')
})
