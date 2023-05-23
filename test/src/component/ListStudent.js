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
        }).then((result) => {
            if (result.isConfirmed) {
                confirmDelete(student.id).then(abc => {Swal.fire('Xóa thành công!', '', 'success')}).catch(er => {alert('xóa k đc')});
                
            }
        })
    }

    return (
        <div>
            <Link to="/add">Thêm mới</Link>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Tuổi</th>
                        <th style={{textAlign: "center"}} scope="col" colSpan={2}>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student, index) =>
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.gender ? "Nam" : "Nữ"}</td>
                            <td>{student.age}</td>
                            <td><button className="btn btn-outline-primary text-danger"><Link style={{textDecoration: "none"}} to={"edit/" + student.id}>Chỉnh sửa </Link></button></td>
                            <td><button onClick={() => deleteStudent(student)} className="btn btn-outline-danger">Xóa</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}