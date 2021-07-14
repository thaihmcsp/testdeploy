function dangNhap() {
  console.log($(".username").val());
  console.log($(".password").val());

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: {
      username: $(".username").val(),
      password: $(".password").val(),
    },
  })
    .then((data) => {
      console.log(data.data.id);
      $(".noti").html("");
      $(".noti").append(data.mess);
      if (data.status == 200) {
        setCookie("user", data.data.id, 1);
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$.ajax({
  url: "/user/checkLogin",
  type: "POST",
})
  .then((data) => {
    if (data.status == 200) {
      window.location.href = "/";
    }
  })
  .catch((err) => {
    console.log(err);
  });
