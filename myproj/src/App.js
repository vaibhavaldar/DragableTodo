import logo from './logo.svg';
import './App.css';
import DragableTodo from './component/DragableTodo.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <DragableTodo />
      </BrowserRouter>
    </div>
  );
}

export default App;

