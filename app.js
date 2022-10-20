var express = require('express');
var mongoose = require('mongoose')
var axios = require('axios')
var app = express();

app.use('/static', express.static("public"));
app.set("view engine", "ejs");
 const Todo = require('./models/todo.model');
const mongoDB = 'mongodb+srv://candies_amanda:Ndx2dZV7I5rUTaJv@cluster0.godqah8.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console,"MongoDb connection error: "))


//Use this site to figure out how to pull data using axios
        //https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/ 



app.get('/', function(req, res){
  let comicData = {}
  randComic = Math.floor(Math.random()*2682)+1
  String(randComic)
  console.log(randComic)
  axios.get('https://xkcd.com/'+ randComic +'/info.0.json ').then(function(response){
    Todo.find(function(err, todo){
        console.log(todo)
          if(err){
          res.json({"Error: ": err})
          } else {
          res.render('todo.ejs', {comicData: response.data});
          }
      })
    }).catch(function(error){
         res.json({"Error: ": error})
          })
      
})
 

app.listen(3000, function(){
    console.log('App listen on port 3000')
})
