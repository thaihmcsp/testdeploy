const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/K12mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const UserSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    avatar: String,
  },
  { collection: "user" }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
