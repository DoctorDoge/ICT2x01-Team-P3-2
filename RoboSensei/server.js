const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
var cookieParser = require('cookie-parser')
const net = require('net')
const fs = require('fs')

const tcpServer = net.createServer(function (client) {
  console.log("MSP432 Is Connected")
  client.setEncoding('utf-8')
  client.on('data', function (data) {
    console.log(data)
    if (data == "Hello") {
      try {
        const data = fs.readFileSync('assets/MSP432 Files/commands.txt', 'utf8')
        fs.truncateSync( 'assets/MSP432 Files/commands.txt', 0 )
        client.end("FLR")
      } catch (err) {
        console.log(err)
      }
    } else {
      // console.log(JSON.parse(data))

    }
  })
  client.on('end', function () {
    console.log("MSP432 Disconnected")
  })

});
tcpServer.listen(5000,()=>{
  console.log("TCP Server Listening on Port:5000")
})
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect("mongodb+srv://ict2101:P%40ssw0rd@ict2101.rwtq5.mongodb.net/ict2101?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

//Initialising Express Session
app.use(
  session({
    secret: "Wl3kQyRhQnpaa24I",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize());
app.use(passport.session());

var index = require('./routers/index');
app.use('/', index);

//Setting up instructor routes
var user = require("./routers/instructor");
app.use("/instructor", user);

//Setting up instructor dashboard route
var instructor_dashboard = require("./routers/instructor_dashboard");
app.use("/instructor_dashboard", instructor_dashboard);

//Setting up login route
var login = require("./routers/login");
app.use("/login", login);

//Setting up login route
var login = require("./routers/game");
app.use("/game", login);

//Setting up logout route
app.use('/logout',(req,res)=>{
  req.logOut()
  res.render("index")
})

//Setting up instructor routes
var user = require("./routers/student");
app.use("/student", user);

var server = app.listen(3001, () =>{
    console.log('app is running on port 3001');
})

module.exports = server;