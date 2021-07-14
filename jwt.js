const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./UserModel");

let password = "123";

bcrypt.hash(password, 2, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

async function testPassword(hash, input) {
  try {
    let res = await bcrypt.compare(input, hash);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

testPassword(
  "$2b$15$Huzt9RRDs/lHr2DqhfShqeCLL4zsSaz5ltC8TsG.RgEInAkCjzBIy",
  "asd"
);
