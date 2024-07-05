const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const datas = require("./models/signup.js");
const path = require("path");
const port = 3000;




app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.set("views",(path.join(__dirname,"/views")));
app.use(express.urlencoded({extended: true}));

//connecting mongoDb with nodejs Javascript RunTime Environment

//To handle initial connection errors, you should use .catch() with async/await.
main()
  .then((res) => {
    console.log("Connection Successfull.");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
 await mongoose.connect("mongodb://127.0.0.1:27017/signup");
}

//To handle errors after initial connection was established, you should listen for error events on the connection.
mongoose.connection.on('error', (err) => {
  console.log("Error connecting to DataBase");
});
//once connection is done
mongoose.connection.once('open', (err) => {
  console.log("Connected to DataBase");
});


app.post("/sign_up", (req,res) => {
  let name1 = req.body.name;
  let email1 = req.body.email;
  let phno1 = req.body.phno;
  let password1 = req.body.password;
  
  let data1 = new datas({
    name : name1,
    email : email1,
    phno : phno1,
    password : password1,
  });
  data1.save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
 res.render("index.ejs",{nam : data1.name });
});

app.get("/", (req,res) => {
  res.set({
    "Allow-access-Allow-Origin" : '*'
  })
  return res.redirect("form.html");
});
app.listen(port, () =>{
  console.log(`listening on port ${port}`);
});