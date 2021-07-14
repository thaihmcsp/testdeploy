const express = require("express");
const path = require("path");
const UserRouter = require("../routes/userRouter");
const jwtRouter = require("../routes/jwtRouter");
var cookieParser = require("cookie-parser");
const UserModel = require("../UserModel.js");
const app = express();

app.set("view engine", "ejs");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let link = path.join(__dirname, "../public/uploads");
    cb(null, link);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage });

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../home.html"));
});

app.use("/user", UserRouter);
app.use("/jwt", jwtRouter);

app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/home", function (req, res) {
  console.log(req.query);
  res.sendFile(path.join(__dirname, "../home.html"));
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "../upload.html"));
});

app.post("/profile", upload.single("upFile"), async function (req, res, next) {
  let index = req.file.path.indexOf("public");
  let link = req.file.path.slice(index, req.file.path.length);

  let data = await UserModel.create({
    username: req.body.username,
    password: req.body.password,
    avatar: "/" + link,
  });
  res.json(data);
});

app.listen(4000);
