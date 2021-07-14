const mongoose = require("./connectDB");

const jwtSchema = mongoose.Schema(
  {
    jwt: String,
  },
  { collection: "jwt" }
);

const jwtModel = mongoose.model("jwt", jwtSchema);

module.exports = jwtModel;
