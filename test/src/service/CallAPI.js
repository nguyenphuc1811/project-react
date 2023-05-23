import axios from 'axios'
 const findAll = async () => {
    return await axios.get('http://localhost:3000/studentList').then(next => next.data);
}

 const deleteById = async (id) => {
    await axios.delete('http://localhost:3000/studentList/' + id).then();
}
 const saveStudent = async (student) => {
    await axios.post('http://localhost:3000/studentList' , student).then()
}

const findById = async (id) => {
    const student = await axios.get('http://localhost:3000/studentList/'+id)
    return student;
}
const editStudent = async(student) => {
await axios.put('http://localhost:3000/studentList/'+ student.id , student).then()
}
export const callApiService = {
    findAll, deleteById ,saveStudent,findById,editStudent
}
