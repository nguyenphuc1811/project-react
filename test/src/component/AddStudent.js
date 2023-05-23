import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { callApiService} from "../service/CallAPI";
const studentValidate = Yup.object().shape({
    name: Yup.string().min(3, "Vui lòng nhập tên > 3").max(20, "Tên quá dài < 20").required("Không được để trống"),
    age: Yup.number("Phải là số").max(100, "Phải nhỏ hơn 100").min(18, "Phải trên 18 tuổi").required("Không được để trống"),
    gender: Yup.boolean().required("Phải nhập")
})
const confirmStudent = async (student) => {
    await callApiService.saveStudent(student).catch(a => {
        alert('them khong duoc');
    })
    document.getElementById("form").reset();
}
const addStudent = async (student) => {
    await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm mới thành công',
        showConfirmButton: false,
        timer: 1500,
    }, confirmStudent(student))
}

const AddStudent = () => {
    return (
        <>
            <h1>Thêm mới học sinh</h1>
            <Link to="/">Quay lại trang chủ</Link>
            <Formik
                initialValues={{
                    name: '',
                    age: 0,
                    gender: false
                }}
                validationSchema={studentValidate}
                onSubmit={value => {
                    addStudent(value);
                }}
            >
                {({ errors, touched }) => (
                    <Form id="form">
                        <label htmlFor="name">
                            Tên: 
                        </label>
                        {errors.name && touched.name ? (
                            <span style={{marginleft: "10px"}} className="text-danger" >{errors.name}</span>
                        ) : null}
                        <Field type="text" className="form-control" name="name" />
                        <label htmlFor="age">Tuổi</label>
                        {errors.age && touched.age ? (
                            <span style={{marginleft: "10px"}} className="text-danger">{errors.age}</span>
                        ) : null}
                        <Field type="text" className="form-control" name="age" />
                        <p>Giới tính</p>
                        <span>Nam: </span>
                        <Field type="radio" name="gender" value="true" />
                        <span>Nữ: </span>
                        <Field type="radio" name="gender" value="false" checked />
                        <button className="btn btn-primary" type="submit" disabled={Object.keys(errors).length > 0 && Object.keys(touched).length > 0}>Thêm mới</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddStudent;