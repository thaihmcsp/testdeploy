const User = require("../UserModel");

function checkDupicate(req, res, next) {
  User.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        res.json({ mess: "user da ton tai", status: 400, err: false });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.json({ mess: "loi server", status: 500, err: err });
    });
}

module.exports = { checkDupicate };
