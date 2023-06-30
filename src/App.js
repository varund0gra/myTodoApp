import './App.css';
import  { Login,Main } from './Frontend';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
