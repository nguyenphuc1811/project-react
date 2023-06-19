create database example;
use  example;
create table Khoa (
makhoa char(10) primary key,
tenkhoa char(30),
dienthoai char(10)
);
create table GiangVien (
magv int primary key,
hotengv char(30),
luong decimal(5,2),
makhoa char(10)
);
create table SinhVien(
masv int primary key,
hotensv char(30),
makhoa char(10),
namsinh int,
quequan char(30),
foreign key(makhoa) references Khoa(makhoa)
);
create table DeTai(
madt char(30) primary key,
tendt char(30),
kinhphi int,
noithuctap char(30)
);
create table HuongDan(
masv int ,
madt char(10),
magv int,
ketqua decimal(5,2),
foreign key(masv) references SinhVien(masv),
foreign key(magv) references GiangVien(magv),
foreign key(madt) references DeTai(madt)
);
INSERT INTO Khoa VALUES
("Geo","Dia ly va QLTN",3855413),
("Math","Toan",3855411),
("Bio","Cong nghe Sinh hoc",3855412);
INSERT INTO GiangVien VALUES
(11,"Thanh Xuan",700,"Geo"),
(12,"Thu Minh",500,"Math"),
(13,"Chu Tuan",650,"Geo"),
(14,"Le Thi Lan",500,"Bio"),
(15,"Tran Xoay",900,"Math");
INSERT INTO SinhVien VALUES
(1,"Le Van Sao","Bio",1990,"Nghe An"),
(2,"Nguyen Thi My","Geo",1990,"Thanh Hoa"),
(3,"Bui Xuan Duc","Math",1992,"Ha Noi"),
(4,"Nguyen Van Tung","Bio",null,"Ha Tinh"),
(5,"Le Khanh Linh","Bio",1989,"Ha Nam"),
(6,"Tran Khac Trong","Geo",1991,"Thanh Hoa"),
(7,"Le Thi Van","Math",null,"null"),
(8,"Hoang Van Duc","Bio",1992,"Nghe An");
INSERT INTO DeTai VALUES
("Dt01","GIS",100,"Nghe An"),
("Dt02","ARC GIS",500,"Nam Dinh"),
("Dt03","Spatial DB",100, "Ha Tinh"),
("Dt04","MAP",300,"Quang Binh" );
INSERT INTO HuongDan VALUES
(1,"Dt01",13,8),
(2,"Dt03",14,0),
(3,"Dt03",12,10),
(5,"Dt04",14,7),
(6,"Dt01",13,Null),
(7,"Dt04",11,10),
(8,"Dt03",15,6);
-- Sử dụng lệnh truy vấn SQL lấy ra mã số và tên các đề tài có nhiều hơn 2 sinh viên tham gia thực tập  
select dt.tendt,dt.madt from detai dt left join HuongDan hd on dt.madt = hd.madt group by hd.madt having count(hd.masv) > 2;
-- Sử dụng câu lệnh truy vấn SQL lấy ra mã số, tên đề tài của đề tài có kinh phí cao nhất 
select madt,tendt from detai where kinhphi = (select max(kinhphi) from detai);
-- Sử dụng câu lệnh SQL xuất ra Tên khoa, Số lượng sinh viên của mỗi khoa .
select k.tenkhoa,count(sv.masv) as slsv from khoa k left join sinhvien sv on k.makhoa = sv.makhoa group by k.makhoa;