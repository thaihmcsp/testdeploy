let id = getCookie("user");

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function doiPass() {
  let username = $(".username").val();
  let password = $(".password").val();
  let newPass = $(".newPass").val();
  $.ajax({
    url: "/user/" + id,
    type: "PUT",
    data: {
      username,
      password,
      newPass,
    },
  })
    .then((data) => {
      $(".noti").html("");
      $(".noti").html(data.mess);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
