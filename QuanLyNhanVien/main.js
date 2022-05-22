var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function defaultStatus() {
  getEle("tknv").value = "";
  getEle("tknv").disabled = false;
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  getEle("chucvu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";
  getEle("btnCapNhat").disabled = true;

  getEle("btnThemNV").style.display = "inline-block";

  getEle("tbTKNV").innerHTML = "";
  getEle("tbTen").innerHTML = "";
  getEle("tbEmail").innerHTML = "";
  getEle("tbMatKhau").innerHTML = "";
  getEle("tbNgay").innerHTML = "";
  getEle("tbLuongCB").innerHTML = "";
  getEle("tbChucVu").innerHTML = "";
  getEle("tbGiolam").innerHTML = "";
}

function layThongTinNV(isAdd) {
  var _tknv = getEle("tknv").value;
  var _name = getEle("name").value;
  var _email = getEle("email").value;
  var _password = getEle("password").value;
  var _datepicker = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucvu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  //Check validation
  var isValid = true;

  //tknv
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(_tknv, "tbTKNV", "Vui lòng nhập tài khoản") &&
      validation.kiemTraDoDaiKiTu(
        _tknv,
        "tbTKNV",
        4,
        6,
        "Tài khoản phải có 4-6 ký tự"
      ) &&
      validation.kiemTraTKNVTonTai(
        _tknv,
        "tbTKNV",
        "Tài khoản đã tồn tại",
        dsnv.arr
      );
  }

  //tenNV
  isValid &=
    validation.kiemTraRong(_name, "tbTen", "Vui lòng nhập họ tên nhân viên") &&
    validation.kiemTraChuoiKiTu(
      _name,
      "tbTen",
      "Vui lòng nhập đúng chuỗi ký tự"
    );

  //email
  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "Vui lòng nhập email") &&
    validation.kiemTraEmail(_email, "tbEmail", "Vui lòng nhập đúng định dạng");

  //password
  isValid &=
    validation.kiemTraRong(_password, "tbMatKhau", "Vui lòng nhập mật khẩu") &&
    validation.kiemTraMatKhau(
      _password,
      "tbMatKhau",
      "Mật khẩu phải chứa 6-10 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    ) &&
    validation.kiemTraDoDaiKiTu(
      _password,
      "tbMatKhau",
      6,
      10,
      "Mật khẩu phải chứa 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );

  //ngayLam
  isValid &=
    validation.kiemTraRong(_datepicker, "tbNgay", "Vui lòng nhập ngày làm") &&
    validation.kiemTraDinhDangNgay(
      _datepicker,
      "tbNgay",
      "Vui lòng nhập đúng định dạng ngày"
    );

  //luongCB
  isValid &=
    validation.kiemTraRong(
      _luongCB,
      "tbLuongCB",
      "Vui lòng nhập lương cơ bản"
    ) &&
    validation.kiemTraLuong(
      _luongCB,
      "tbLuongCB",
      1000000,
      20000000,
      "Vui lòng nhập mức lương hợp lệ"
    );

  //chucVu
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "Vui lòng chọn chức vụ"
  );

  //gioLam
  isValid &=
    validation.kiemTraRong(_gioLam, "tbGiolam", "Vui lòng nhập giờ làm") &&
    validation.kiemTraGioLam(
      _gioLam,
      "tbGiolam",
      80,
      200,
      "Vui lòng nhập giờ làm hợp lệ"
    );

  //check isValid
  if (!isValid) return;

  var nhanVien = new NhanVien(
    _tknv,
    _name,
    _email,
    _password,
    _datepicker,
    _luongCB,
    _chucvu,
    _gioLam
  );

  nhanVien.tinhLuong();
  nhanVien.xepLoai();

  return nhanVien;
}

getEle("btnThem").onclick = function () {
  defaultStatus();
};

getEle("btnThemNV").onclick = function () {
  var nhanVien = layThongTinNV(true);
  if (nhanVien) {
    var nhanVien = layThongTinNV();
    dsnv.themNV(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
  }
};

function taoBang(data) {
  var content = "";
  data.forEach(function (item) {
    content += `
            <tr>
                <td>${item.tknv}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.datepicker}</td>
                <td>${item.chucvu}</td>
                <td>${item.tongLuong}</td>
                <td>${item.loaiNV}</td>
                <td>
                    <button class="btn btn-success text-white btnEdit" onclick="suaNV('${item.tknv}')" data-toggle="modal"
                    data-target="#myModal"> Edit </button> 
                    <button class="btn btn-danger text-white btnDelete" onclick="xoaNV('${item.tknv}')"> Delete </button>
                </td>
            </tr>
        `;
  });
  getEle("tableDanhSach").innerHTML = content;
}

function suaNV(id) {
  defaultStatus();
  var nv = dsnv.suaNV(id);
  if (nv) {
    getEle("tknv").value = nv.tknv;
    getEle("name").value = nv.name;
    getEle("email").value = nv.email;
    getEle("password").value = nv.password;
    getEle("datepicker").value = nv.datepicker;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucvu;
    getEle("gioLam").value = nv.gioLam;
  }
  getEle("btnCapNhat").disabled = false;
  getEle("btnThemNV").style.display = "none";
  getEle("tknv").disabled = true;
}

getEle("btnCapNhat").onclick = function () {
  var nhanVien = layThongTinNV(false);
  dsnv.capNhat(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
};

function xoaNV(id) {
  dsnv.xoaNV(id);
  taoBang(dsnv.arr);
  setLocalStorage();
}

getEle("searchName").addEventListener("keyup", function () {
  var searchName = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(searchName);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  var dataString = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    var dataJson = JSON.parse(dataString);
    dsnv.arr = dataJson;
    taoBang(dsnv.arr);
  }
}

// {
//     var nvTR = document.createElement('tr');
//     var nvTD_1 = document.createElement('td');
//     var nvTD_2 = document.createElement('td');
//     var nvTD_3 = document.createElement('td');
//     var nvTD_4 = document.createElement('td');
//     var nvTD_5 = document.createElement('td');
//     var nvTD_6 = document.createElement('td');
//     // var nvTD_7 = document.createElement('td');

//     // var btnDel = document.createElement('button');
//     // btnDel.innerHTML = 'Delete';
//     // btnDel.style.backgroundColor = 'red';
//     // btnDel.style.color = 'white';
//     // btnDel.onclick = function() {deleteButton(nvTR, this)};

//     nvTD_1.innerHTML = nv.tknv;
//     nvTD_2.innerHTML = nv.name;
//     nvTD_3.innerHTML = nv.email;
//     nvTD_4.innerHTML = nv.datepicker;
//     nvTD_5.innerHTML = nv.chucVu;
//     nvTD_6.innerHTML = '<button class="btn btn-success text-white btnEdit"> Edit </button> <button class="btn btn-danger text-white btnDelete"> Delete </button>';
//     // nvTD_6.innerHTML = '<button> Delete </button>';
//     // nvTD_6.appendChild(btnDel);

//     nvTR.appendChild(nvTD_1);
//     nvTR.appendChild(nvTD_2);
//     nvTR.appendChild(nvTD_3);
//     nvTR.appendChild(nvTD_4);
//     nvTR.appendChild(nvTD_5);
//     nvTR.appendChild(nvTD_6);

//     getEle('tableDanhSach').appendChild(nvTR);

//     function deleteButton(x) {
//         var parent = getEle('tableDanhSach');
//         parent.removeChild(x);
//         // parent.removeChild(y);
//     }
//     var arrTr = document.querySelectorAll('#tableDanhSach tr');
//     console.log(arrTr);
//     var arrBtnDel = document.getElementsByClassName('btnDelete');
//     console.log(arrBtnDel);
//     // arrBtnDel.forEach(function(item, index, arr) {
//     //     var eachTr = arrTr[index];
//     //     arr[index].onclick = function() {deleteButton(eachTr)};
//     //     // btnDel.onclick = function() {deleteButton(eachTr)};
//     // });
//     for (i = arrBtnDel.length - 1; i >= 0; i--) {
//         var btnDel = arrBtnDel[i];
//         console.log(btnDel);
//         btnDel.onclick = function () {
//             var parent = getEle('tableDanhSach');
//             // console.log(parent);
//             parent.removeChild();
//         };
//     }
// }

// function deleteButton(x, y) {
//     var parent = getEle('tableDanhSach');
//     parent.removeChild(x);
//     parent.removeChild(y);
// }
