const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/K12mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const jwtSchema = mongoose.Schema(
  {
    jwt: String,
  },
  { collection: "jwt" }
);

const jwtModel = mongoose.model("jwt", jwtSchema);

module.exports = jwtModel;
