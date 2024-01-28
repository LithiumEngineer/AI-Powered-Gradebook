import { useState, useEffect } from "react"
import axios from "axios"
import { RingLoader } from "react-spinners"
import StudentItem from "./StudentItem"
import StudentHeader from "./StudentHeader"
import PopupModal from "./PopupModal"
import CoHere from "./CoHere"
import React from "react"
import { data } from "autoprefixer"

const Students = ({ sub }) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [selected, setSelected] = useState([])
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [studentList, setStudentList] = useState([])
  const [testList, setTestList] = useState([])
  const [studentGradesJson, setStudentGradesJson] = useState({}) // for cohere
  const [student, setStudent] = useState({}) // for popup modal
  const [isLoading, setIsLoading] = useState(false)
  const [showCoHere, setShowCoHere] = useState(false)

  useEffect(() => {
    if (showAddPopup) return;
    setIsLoading(true);
    axios.get(`http://localhost:3500/students/${sub}`).then((res) => {
      setStudentList(res.data)
      setIsLoading(false)
    })
  }, [showAddPopup])

  useEffect(() => {
    axios.get(`http://localhost:3500/tests/${sub}`).then((res) => {
      setTestList(res.data)
    })
  }, [])

  const handleSelect = (student) => {
    if (!selected.includes(student)) {
      setSelected([...selected, student])
    } else {
      setSelected(selected.filter((item) => item != student))
    }
  }

  const handleSelectAll = () => {
    if (
      studentList.every((student) => selected.includes(student.id)) &&
      studentList.length !== 0
    ) {
      setSelected([])
    } else {
      setSelected(studentList.map((student) => student.id))
    }
  }

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      await axios.delete(`http://localhost:3500/students`, { data: { record_id: id } })
    } catch (err) {
      console.log(err)
    }

    axios.get(`http://localhost:3500/students/${sub}`).then((res) => {
      setIsLoading(false)
      setSelected([])
      setStudentList(res.data)
    })
  }

  const generateStudentJson = (id) => {
    let temp_json = testList.map((test) => {
      const json_str = test.student_grades_json;
      const scores = JSON.parse(json_str).json;
      return (
        {
          test_name: test.name,
          topics: test.topic,
          mark: scores.find((score) => (score.student_id).toString() === (id).toString()).grade
        }
      )
    });

    return temp_json;
  }

  const handleWorksheetGeneration = async (id) => {
    const data_json = generateStudentJson(id);
    setStudentGradesJson(data_json);
    //console.log("data_json: ", data_json);
    setShowCoHere(true);
  }

  const closeDetailsPopUp = () => {
    setShowDetailsPopup(false)
  }

  const openDetailsPopUp = (id) => {
    setShowDetailsPopup(true)
    setStudent(studentList.find((student) => student.id === id))
  }

  const openAddPopup = () => {
    setShowAddPopup(true)
  }

  const closeAddPopup = () => {
    setShowAddPopup(false)
  }

  if (showCoHere) return <CoHere student_test_data={studentGradesJson} setShowCoHere={setShowCoHere}/>
  else if (isLoading) return <div className="flex h-screen bg-[#FFFDE8] justify-center items-center align-middle"><RingLoader /></div>;

  return (
    <div className="flex flex-col bg-[#FFFDE8] h-screen w-auto">
      <PopupModal open={showAddPopup} onClose={() => closeAddPopup()} type="addstudent" sub={sub}/>
      <PopupModal open={showDetailsPopup} onClose={() => closeDetailsPopUp()} type="student" student={student} sub={sub}/>
      <div className="text-3xl font-bold text-[#545F71] py-10 ml-10">
        Students
      </div>
      <div className="w-auto mx-10">
        <StudentHeader
          handleSelectAll={handleSelectAll}
          selected={
            studentList.every((student) => selected.includes(student.id)) &&
            studentList.length !== 0
          }
          openAddPopup={openAddPopup}
        />
        <div className="w-auto h-[1px] bg-orange-300 mx-2"></div>
      </div>
      <div className="flex-1 w-auto mx-10 mb-10 overflow-y-scroll">
        {studentList.map((student) => {
          return (
            <StudentItem
              key={student.id}
              id={student.id}
              name={student.first_name + " " + student.last_name}
              selected={selected.includes(student.id)}
              handleSelect={handleSelect}
              handleDelete={handleDelete}
              openDetailsPopUp={openDetailsPopUp}
              handleWorksheetGeneration={handleWorksheetGeneration}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Students
