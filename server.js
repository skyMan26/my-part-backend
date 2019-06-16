const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
const userAccountRoutes = express.Router();

let UserAccount = require("./user_account.model");
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/user_account", {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection established successfully");
});

userAccountRoutes.route("/login").post(function(req, res) {
  //let loginData = new UserAccount(req.body);
  let userId = req.body.user_id;
  console.log(userId);
  UserAccount.find({ user_id: userId }, function(err, todo) {
    res.json(todo);
    console.log(todo);
  });
});

userAccountRoutes.route("/signup").post(function(req, res) {
  let signupData = new UserAccount(req.body);
  console.log(req.body);
  signupData
    .save()
    .then(v => {
      res.status(200).json({ signupData: "login data added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new login failed");
    });
});

app.use("/useraccount", userAccountRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port:" + PORT);
});
