import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { callApiService } from '../service/CallAPI';
export default function ListStudent() {
    const [studentList, setStudentList] = useState([]);
    const getList = async () => {
        const listApi = await callApiService.findAll();
        setStudentList(listApi);
    }

    const confirmDelete = async (id) => {
        await callApiService.deleteById(id);
        getList();
    }
    useEffect(() => {
        getList()
    }, [])

    const deleteStudent = async (student) => {
        return Swal.fire({
            title: 'Bạn có muốn xóa ' + student.name + " không ?",
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                confirmDelete(student.id).then(abc => { Swal.fire('Xóa thành công!', '', 'success') }).catch(er => { alert('xóa k đc') });
            }
        })
    }
    const buttonP = {padding : "6px 40px",margin: "0 0 0 5px"}
    return (
        <div>
        
            <button className="btn btn-outline-success"><Link style={{ textDecoration: "none" }}  to="/add">Thêm mới</Link></button>
            <table className="table table-hover table-dark">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Tuổi</th>
                        <th style={{ textAlign: "center" }} scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student, index) =>
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.gender ? "Nam" : "Nữ"}</td>
                            <td>{student.age}</td>
                            <th style={{textAlign: "center"}}><button className="btn btn-primary"><Link style={{ textDecoration: "none" ,color: "white",buttonP}} to={"edit/" + student.id}>Chỉnh sửa </Link></button>
                            <button onClick={() => deleteStudent(student)} style={buttonP} className="btn btn-danger">Xóa</button></th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}