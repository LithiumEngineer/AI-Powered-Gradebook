import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
