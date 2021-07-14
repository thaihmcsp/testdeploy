const User = require("./UserModel");
const jwtModel = require("./jwtModel");
const jwt = require("jsonwebtoken");

async function checkLogin(req, res, next) {
  try {
    let cookie = req.cookies.user;
    let id;
    if (!cookie) {
      res.json({ mess: "cookie khong hop le", status: 400, err: false });
    } else {
      var data = await jwtModel.findOne({ jwt: cookie });
      if (data) {
        res.json({ mess: "cookie khong hop le", status: 400, err: false });
      } else {
        id = jwt.verify(cookie, "thai").id;
        data = await User.findOne({ _id: id });
        if (data) {
          req.role = data.role;
          next();
        } else {
          res.json({
            mess: "user chua dang nhap",
            status: 400,
            err: false,
            data,
          });
        }
      }
    }
  } catch (err) {
    res.json({ mess: "loi server", status: 500, err: err });
  }
}

function checkAdmin(req, res, next) {
  if (req.role == "admin") {
    next();
  } else {
    res.json({ mess: "khong co quyen", status: 400, err: false });
  }
}

module.exports = { checkLogin, checkAdmin };
