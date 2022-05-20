var dsnv = new DanhSachNhanVien();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
};

function layThongTinNV() {
    var _tknv = getEle('tknv').value;
    var _name = getEle('name').value;
    var _email = getEle('email').value;
    var _password = getEle('password').value;
    var _datepicker = getEle('datepicker').value;
    var _luongCB = getEle('luongCB').value;
    var _chucvu = getEle('chucvu').value;
    var _gioLam = getEle('gioLam').value;

    var nhanVien = new NhanVien(_tknv, _name, _email, _password, _datepicker, _luongCB, _chucvu, _gioLam);

    return nhanVien;
};

getEle('btnThem').onclick = function () {
    getEle('tknv').value = '';
    getEle('name').value = '';
    getEle('email').value = '';
    getEle('password').value = '';
    getEle('datepicker').value = '';
    getEle('luongCB').value = '';
    getEle('chucvu').value = '';
    getEle('gioLam').value = '';
    getEle('btnCapNhat').disabled = true;

    getEle('btnThemNV').style.display = "inline-block";
}

getEle('btnThemNV').onclick = function () {
    var nhanVien = layThongTinNV();
    dsnv.themNV(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
};

function taoBang(data) {
    var content = '';
    data.forEach(function (item) {
        content += `
            <tr>
                <td>${item.tknv}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.datepicker}</td>
                <td>${item.chucvu}</td>
                <td></td>
                <td>
                    <button class="btn btn-success text-white btnEdit" onclick="suaNV('${item.tknv}')" data-toggle="modal"
                    data-target="#myModal"> Edit </button> 
                    <button class="btn btn-danger text-white btnDelete" onclick="xoaNV('${item.tknv}')"> Delete </button>
                </td>
            </tr>
        `;
    });
    getEle('tableDanhSach').innerHTML = content;
};

function suaNV(id) {
    var nv = dsnv.suaNV(id);
    if (nv) {
        getEle('tknv').value = nv.tknv;
        getEle('name').value = nv.name;
        getEle('email').value = nv.email;
        getEle('password').value = nv.password;
        getEle('datepicker').value = nv.datepicker;
        getEle('luongCB').value = nv.luongCB;
        getEle('chucvu').value = nv.chucvu;
        getEle('gioLam').value = nv.gioLam;
    }
    getEle('btnCapNhat').disabled = false;
    getEle('btnThemNV').style.display = "none";
    getEle('tknv').disabled = true;
}

getEle("btnCapNhat").onclick = function (){
    var nhanVien = layThongTinNV();
    dsnv.capNhat(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
}

function xoaNV(id) {
    dsnv.xoaNV(id);
    taoBang(dsnv.arr);
    setLocalStorage();
}

getEle('searchName').addEventListener("keyup", function(){
    var searchName = getEle('searchName').value;
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
