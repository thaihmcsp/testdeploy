const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://thaidd7b:123@cluster0.jqh8p.mongodb.net/K12?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

module.exports = mongoose;
