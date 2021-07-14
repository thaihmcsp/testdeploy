const express = require("express");
const router = express.Router();
const jwtModel = require("../jwtModel");

router.post("/", (req, res) => {
  let jwt = req.cookies.user;
  jwtModel
    .create({ jwt: jwt })
    .then((data) => {
      if (data) {
        res.json({ mess: "dang xuat ok", status: 200, err: false });
      } else {
        res.json({ mess: "dang xuat that bai", status: 400, err: false });
      }
    })
    .catch((err) => {
      res.json({ mess: "loi server", status: 500, err: err });
    });
});

module.exports = router;
