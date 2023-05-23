
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ListStudent from './component/ListStudent';
import EditStudent from './component/EditStudent';
import AddStudent from './component/AddStudent';

function App() {
  return (
      <Routes>
        <Route path='/' element={<ListStudent />} />
        <Route path='add' element={<AddStudent />} />
        <Route path='edit/:id' element={<EditStudent />} />
      </Routes>
  );
}

export default App;
