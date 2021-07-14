const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../UserModel");
const { checkDupicate } = require("../controller/UserController");
const { checkLogin, checkAdmin } = require("../checkAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/dangky", function (req, res) {
  res.sendFile(path.join(__dirname, "../upload.html"));
});

router.get("/testEJS", async (req, res) => {
  let data = await User.find();
  res.render("pages/test", { data });
});

router.get("/dangnhap", function (req, res) {
  res.sendFile(path.join(__dirname, "../dangnhap.html"));
});

router.get("/doiPass", function (req, res) {
  res.sendFile(path.join(__dirname, "../doiPass.html"));
});

router.post("/", checkDupicate, async (req, res) => {
  try {
    let password = await bcrypt.hash(req.body.password, 10);
    let data = await User.create({
      username: req.body.username,
      password: password,
      role: req.body.role,
    });
    res.json({ mess: "tao user thanh cong", status: 200, err: false, data });
  } catch (err) {
    res.json({ mess: "loi server", status: 500, err: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    let data = await User.findOne({
      username: req.body.username,
    });
    if (data) {
      let check = await bcrypt.compare(req.body.password, data.password);
      if (check) {
        let id = jwt.sign({ id: data._id }, "thai");
        res.json({
          mess: "dang nhap thanh cong",
          status: 200,
          err: false,
          data: { id: id },
        });
      } else {
        res.json({ mess: "nhap sai password", status: 400, err: false });
      }
    } else {
      res.json({ mess: "nhap sai user", status: 400, err: false });
    }
  } catch (err) {
    res.json({ mess: "loi server", status: 500, err: err });
  }
});

router.put("/:id", checkLogin, (req, res) => {
  User.updateOne(
    {
      _id: req.params.id,
      username: req.body.username,
      password: req.body.password,
    },
    { password: req.body.newPass }
  )
    .then((data) => {
      if (data.nModified) {
        res.json({ mess: "doi pass thanh cong", status: 200, err: false });
      } else {
        res.json({ mess: "nhap sai user, pass", status: 400, err: false });
      }
    })
    .catch((err) => {
      res.json({ mess: "loi server", status: 500, err: err });
    });
});

router.delete("/:id", checkLogin, checkAdmin, (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json({ mess: "xoa user thanh cong", status: 200, err: false });
    })
    .catch((err) => {
      res.json({ mess: "loi server", status: 500, err: err });
    });
});

router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      res.json({ mess: "find ok", status: 200, err: false, data });
    })
    .catch((err) => {
      res.json({ mess: "loi server", status: 500, err: err });
    });
});

router.get("/page", async (req, res) => {
  try {
    let skip = (req.query.page - 1) * req.query.qual;
    let data = await User.find().skip(skip).limit(parseInt(req.query.qual));
    res.json({ mess: "find ok", status: 200, err: false, data });
  } catch (err) {
    res.json({ mess: "loi server", status: 500, err: err });
  }
});

router.get("/phanTrang", (req, res) => {
  res.sendFile(path.join(__dirname, "../phanTrang.html"));
});

router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/checkLogin", checkLogin, (req, res) => {
  res.json({ mess: "user da dang nhap", status: 200, err: false });
});

module.exports = router;
