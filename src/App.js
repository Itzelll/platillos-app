import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";

import AddPlatillo from "./components/add-platillo.component";
import PlatillosList from "./components/platillos-list.component";
import instagram from "./instagram.png";
import cv from "./cv.jpeg"

import { Login } from './components/users/Login'
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Logout } from './components/users/Logout';
import { Register } from './components/users/Register';
import { Perfil } from './components/users/Perfil';


class App extends Component {


  render() {
    return (

      <div>
        <nav className="navbar navbar-expand">
          <div className="Nav">
            <div className="Nav-menus"><img src={instagram} width={35} height={35} alt=''></img>
              <div className="Nav-brand">
                <a className="navbar-brand" href='/'>

                  <Link to={"/platillo"} className="nav-link">
                    Instagram
                  </Link>
                </a>
              </div>

              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/platillo"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to={"/perfil"} className='nav-link'>
                    Ver perfil
                  </Link>
                </li>
                <li className='nav-item'>
                  <AuthProvider>
                    <Logout />
                  </AuthProvider>
                </li>
                <li className="nav-item justify-content-end">
                  <a className="nav-link" href='https://itzelll-streamlit-mongodb-streamlit-mongo-a67gjw.streamlit.app/'>
                    Analiticas
                  </a>
                </li>

              </div>
            </div>
          </div>
        </nav>

        <div className="container mt-3">

          <br />
          <h2>Publicaciones</h2>

          <AuthProvider>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route exact path="platillo" element={
                <ProtectedRoute>
                  <PlatillosList />
                </ProtectedRoute>
              } />
              <Route exact path="add" element={
                <ProtectedRoute>
                  <AddPlatillo />
                </ProtectedRoute>
              } />
              <Route path="analitics" element={
                <ProtectedRoute>

                </ProtectedRoute>
              } />
              <Route path="perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </div>
        <footer>
          <div className='bottom'>
            <p><img src={cv} alt='cv' className='img-bottom'></img></p>
            <p className='info1'>Información de estudiante:</p>
            <p className='info'>Itzel Mendez Martinez - S20006761</p>
            <p className='info'>zs20006761@estudiantes.uv.mx</p>
            <p className='info'>https://github.com/Itzelll/front-react</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
