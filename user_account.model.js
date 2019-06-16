const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserAccount = new Schema({
  user_id: {
    type: String
  },
  user_password: {
    type: String
  },
  user_first_name: {
    type: String
  },
  user_last_name: {
    type: String
  }
});

module.exports = mongoose.model("UserAccount", UserAccount);
