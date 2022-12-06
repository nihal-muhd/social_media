import "./App.css"
import { Routes, Route } from 'react-router-dom'
import User from "./routes/User";
import Admin from "./routes/Admin";


function App() {
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Routes>
        <Route element={<User />} path='/*' />
      </Routes>
      <Routes>
        <Route element={<Admin />} path='/admin/*' />
      </Routes>


    </div>
  );
}

export default App;
