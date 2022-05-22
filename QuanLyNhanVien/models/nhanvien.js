function NhanVien(_tknv, _name, _email, _password, _datepicker, _luongCB, _chucvu, _gioLam) {
    this.tknv = _tknv;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.datepicker = _datepicker;
    this.luongCB = _luongCB;
    this.chucvu = _chucvu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.loaiNV = '';

    this.tinhLuong = function () {
        if (this.chucvu === "Giám đốc") {
            this.tongLuong = parseFloat(this.luongCB)*3;
        } else if (this.chucvu === "Trưởng phòng") {
            this.tongLuong = parseFloat(this.luongCB)*2;
        } else {
            this.tongLuong = parseFloat(this.luongCB)*1;
        }
    }

    this.xepLoai = function () {
        if (parseFloat(this.gioLam) >= 192) {
            this.loaiNV = "Xuất sắc";
        } else if (parseFloat(this.gioLam) >= 176 && parseFloat(this.gioLam) < 192) {
            this.loaiNV = "Giỏi";
        } else if (parseFloat(this.gioLam) >= 160 && parseFloat(this.gioLam) < 176) {
            this.loaiNV = "Khá";
        } else {
            this.loaiNV = "Trung bình";
        };
    }
}