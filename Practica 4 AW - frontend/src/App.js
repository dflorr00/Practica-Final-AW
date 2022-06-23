import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import Notas from './pages/notas';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/notas' element={<Notas />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;