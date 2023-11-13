import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from '@/pages/List/TodoList';
import TodoRegist from '@/pages/Regist/TodoRegist';
import TodoInfo from '@/pages/Info/TodoInfo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/regist" element={<TodoRegist />} />
          <Route path="/todo/:_id" element={<TodoInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
