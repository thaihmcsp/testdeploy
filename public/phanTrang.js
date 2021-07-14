let tong = 0;

$.ajax({
  url: "/user",
  type: "get",
})
  .then((data) => {
    tong = data.data.length;
    soNut = Math.ceil(tong / 5);
    for (let i = 1; i <= soNut; i++) {
      let btn = `
      <button onclick="changePage('${i}')">${i}</button>
      `;

      $(".btnList").append(btn);
    }
  })
  .catch((err) => {
    console.log(err);
  });

function renderList(page, qual) {
  $.ajax({
    url: `/user/page?page=${page}&qual=${qual}`,
    type: "get",
  })
    .then((data) => {
      data.data.map((ele) => {
        let detail = `
      <div>
        <div>Name : ${ele.username} </div>
        <div>Age : ${ele.age} </div>
      </div>
      `;

        $(".list").append(detail);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

renderList(1, 5);

function changePage(page) {
  let qual = $(".qual").val();
  $(".list").html("");

  renderList(page, qual);
}

function changeQual() {
  $(".btnList").html("");
  let qual = $(".qual").val();
  let soNut = Math.ceil(tong / qual);
  for (let i = 1; i <= soNut; i++) {
    let btn = `
    <button onclick="changePage('${i}')">${i}</button>
    `;
    $(".btnList").append(btn);
  }
  $(".list").html("");
  renderList(1, qual);
}
