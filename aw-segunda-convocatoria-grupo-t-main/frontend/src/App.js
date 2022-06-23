import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import BandejaEntrada from './pages/bandejaEntrada';
import Registro from './pages/registro';
import Perfil from './pages/perfil';
import { auth } from './server/communication';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {useState, useEffect} from 'react';
import './App.css';

function App() {
  //const [user, setUser] = useState({username:"", type:""});

  const ProtectedRoute = ({ user, children }) => {
    const [page, setPage] = useState();

    useEffect(() => {
      async function authenticate() {
        if (await auth()) {
          setPage(children);
        }else{
          setPage(<Navigate to="/login"/>);
        } 
      }
      authenticate();
    }, [setPage, children]);
    return page;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/bandejaEntrada' element={<ProtectedRoute>
            <BandejaEntrada/>
          </ProtectedRoute>}></Route>
          <Route path='/registro' element={<Registro/>}></Route>
          <Route path='/perfil' element={<ProtectedRoute>
            <Perfil/>
          </ProtectedRoute>}></Route>
        </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;