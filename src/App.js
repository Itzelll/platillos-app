import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";

import AddPlatillo from "./components/add-platillo.component";
import PlatillosList from "./components/platillos-list.component";

class App extends Component{
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/platillo"} className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            </div>
        </nav>
        <div className="container mt-3">
          <h2>React Firestore CRUD</h2>
          <Routes>
            <Route exact path="platillo" element={<PlatillosList/>} />
            <Route exact path="add" element={<AddPlatillo/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
