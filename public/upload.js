async function upload() {
  try {
    let data = $("form")[0];
    let form = new FormData(data);

    let res = await $.ajax({
      url: "/profile",
      type: "post",
      data: form,
      processData: false,
      contentType: false,
    });
    console.log(res);
    $("img").attr("src", res.avatar);
  } catch (err) {
    console.log(err);
  }
}
