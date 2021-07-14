// download
// 6%

// sau 1 giay cập nhật % download về
// cb khi down xong thì thông báo tải thành công

function downLoad1s(cb) {
  let tong = 0;
  let interval = setInterval(function () {
    x = Math.round(Math.random() * 5);
    tong = tong + x;
    console.log(tong, "%");
    cb(tong, interval);
  }, 1000);
}

function thongBao(tyLe, inter) {
  if (tyLe >= 100) {
    console.log("thanhCong");
    clearInterval(inter);
  }
}

downLoad1s(thongBao);
