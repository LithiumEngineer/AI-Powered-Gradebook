import Home from "./components/Home"
import Register from "./components/Register"

import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Unauthorized from "./components/Unauthorized"
import React from "react"

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
