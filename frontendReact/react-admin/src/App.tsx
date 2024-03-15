import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import Nav from "./components/Nav";
// import Menu from "./components/Menu";
// import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/users/Users";

import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} Component={Users} />
          <Route path={"/users"} Component={Users} />
          <Route path={"/users/create"} Component={UserCreate} />
          <Route path={"/users/:id/edit"} Component={UserEdit} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
