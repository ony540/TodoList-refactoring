import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './List/TodoList';
import TodoRegist from './Regist/TodoRegist';
import TodoInfo from './Info/TodoInfo';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/regist" element={<TodoRegist />} />
        <Route path="/todo/:_id" element={<TodoInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
