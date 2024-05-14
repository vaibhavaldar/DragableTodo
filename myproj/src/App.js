import logo from './logo.svg';
import './App.css';
import DragableTodo from './component/DragableTodo.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<DragableTodo />}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

