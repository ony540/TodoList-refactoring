import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoList from '@/pages/TodoList'
import TodoRegist from '@/pages/TodoRegist'
import TodoInfo from '@/pages/TodoInfo'
import TodoUpdate from '@/pages/TodoUpdate'

function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoList/>} />
                <Route path="/regist" element={<TodoRegist/>} />
                <Route path="/:id" element={<TodoInfo/>} />
                <Route path="/:id/update" element={<TodoUpdate/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
