function getEle(id) {
    return document.getElementById(id);
}

// var _tknv = getEle('tknv').value;
// var _name = getEle('name').value;
// var _email = getEle('email').value;
// var _password = getEle('password').value;
// var _datepicker = getEle('datepicker').value;
// var _luongCB = getEle('luongCB').value;
// var _chucvu = getEle('chucvu').value;
// var _gioLam = getEle('gioLam').value;

function NhanVien() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucVu = "";
    this.gioLam = "";
}

getEle('btnThemNV').onclick = function () {
    var _tknv = getEle('tknv').value;
    var _name = getEle('name').value;
    var _email = getEle('email').value;
    var _password = getEle('password').value;
    var _datepicker = getEle('datepicker').value;
    var _luongCB = getEle('luongCB').value;
    var _chucvu = getEle('chucvu').value;
    var _gioLam = getEle('gioLam').value;

    // function NhanVien() {
    //     this.tknv = _tknv;
    //     this.name = _name;
    //     this.email = _email;
    //     this.password = _password;
    //     this.datepicker = _datepicker;
    //     this.luongCB = _luongCB;
    //     this.chucVu = _chucvu;
    //     this.gioLam = _gioLam;
    // }

    var nv = new NhanVien();
    nv.name = _name;
    nv.tknv = _tknv;
    nv.email = _email;
    nv.password = _password;
    nv.datepicker = _datepicker;
    nv.luongCB = _luongCB;
    nv.chucVu = _chucvu;
    nv.gioLam = _gioLam;

    var nvTR = document.createElement('tr');
    var nvTD_1 = document.createElement('td');
    var nvTD_2 = document.createElement('td');
    var nvTD_3 = document.createElement('td');
    var nvTD_4 = document.createElement('td');
    var nvTD_5 = document.createElement('td');
    var nvTD_6 = document.createElement('td');
    // var nvTD_7 = document.createElement('td');

    // var btnDel = document.createElement('button');
    // btnDel.innerHTML = 'Delete';
    // btnDel.style.backgroundColor = 'red';
    // btnDel.style.color = 'white';
    // btnDel.onclick = function() {deleteButton(nvTR, this)};

    nvTD_1.innerHTML = nv.tknv;
    nvTD_2.innerHTML = nv.name;
    nvTD_3.innerHTML = nv.email;
    nvTD_4.innerHTML = nv.datepicker;
    nvTD_5.innerHTML = nv.chucVu;
    nvTD_6.innerHTML = '<button class="btn btn-success text-white btnEdit"> Edit </button> <button class="btn btn-danger text-white btnDelete"> Delete </button>';
    // nvTD_6.innerHTML = '<button> Delete </button>'; 
    // nvTD_6.appendChild(btnDel);

    nvTR.appendChild(nvTD_1);
    nvTR.appendChild(nvTD_2);
    nvTR.appendChild(nvTD_3);
    nvTR.appendChild(nvTD_4);
    nvTR.appendChild(nvTD_5);
    nvTR.appendChild(nvTD_6);

    getEle('tableDanhSach').appendChild(nvTR);

    function deleteButton(x) {
        var parent = getEle('tableDanhSach');
        parent.removeChild(x);
        // parent.removeChild(y);
    }
    var arrTr = document.querySelectorAll('#tableDanhSach tr');
    console.log(arrTr);
    var arrBtnDel = document.getElementsByClassName('btnDelete');
    console.log(arrBtnDel);
    // arrBtnDel.forEach(function(item, index, arr) {
    //     var eachTr = arrTr[index];
    //     arr[index].onclick = function() {deleteButton(eachTr)};
    //     // btnDel.onclick = function() {deleteButton(eachTr)};
    // });
    for (i = arrBtnDel.length - 1; i >= 0; i--) {
        var btnDel = arrBtnDel[i];
        console.log(btnDel);
        btnDel.onclick = function () {
            var parent = getEle('tableDanhSach');
            // console.log(parent);
            parent.removeChild();
        };
    }
    
    
    
    // var delBtn = document.getElementsByClassName('btnDelete');
    // delBtn[0].onclick = function () {deleteButton(nvTR, this)};
}

// function deleteButton(x, y) {
//     var parent = getEle('tableDanhSach');
//     parent.removeChild(x);
//     parent.removeChild(y);
// }
