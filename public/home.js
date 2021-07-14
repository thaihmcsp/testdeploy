// let id = getCookie("user");

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

$.ajax({
  url: "/user/checkLogin",
  type: "POST",
})
  .then((data) => {
    if (data.status !== 200) {
      window.location.href = "/user/dangnhap";
    }
  })
  .catch((err) => {
    console.log(err);
  });

function dangXuat() {
  $.ajax({
    url: "/jwt",
    type: "POST",
  })
    .then((data) => {
      console.log(data);
      delete_cookie("user");
      window.location.href = "/user/dangnhap";
    })
    .catch((err) => {
      console.log(err);
    });
}

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
