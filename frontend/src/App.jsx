import Home from "./components/Home"
import Register from "./components/Register"

import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import CoHere from "./components/Dashboard/CoHere"
import Unauthorized from "./components/Unauthorized"
import React from "react"

function App() {
  const testStudentTestData = {
    "test1": {
      "topic": "trigonometry",
      "style": "essay questions",
      "score": 0.75
    },
    "test2": {
      "topic": "calculus",
      "style": "true/false questions",
      "score": 0.6
    },
    "test3": {
      "topic": "statistics",
      "style": "multiple choice questions",
      "score": 0.85
    },
    "test4": {
      "topic": "algebra",
      "style": "short answer questions",
      "score": 0.4
    },
    "test5": {
      "topic": "geometry",
      "style": "long answer questions",
      "score": 0.9
    },
    "test6": {
      "topic": "trigonometry",
      "style": "multiple choice questions",
      "score": 0.65
    },
    "test7": {
      "topic": "calculus",
      "style": "essay questions",
      "score": 0.55
    },
    "test8": {
      "topic": "statistics",
      "style": "short answer questions",
      "score": 0.7
    },
    "test9": {
      "topic": "algebra",
      "style": "multiple choice questions",
      "score": 0.8
    },
    "test10": {
      "topic": "geometry",
      "style": "true/false questions",
      "score": 0.3
    }
  }

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="generate" element={<CoHere sub="N/A" student_test_data={testStudentTestData} question_num="10"/>} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  )
}

export default App
