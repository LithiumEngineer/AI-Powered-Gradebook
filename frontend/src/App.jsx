import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import Home from "./components/Home"
import Register from "./components/Register"

import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Unauthorized from "./components/Unauthorized"

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  )
}

export default App
