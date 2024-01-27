import { useState, useEffect } from "react"
import axios from "axios"
import { RingLoader } from "react-spinners"
import StudentItem from "./StudentItem"
import StudentHeader from "./StudentHeader"
import PopupModal from "./PopupModal"
import React from "react"

const Students = ({ sub }) => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [selected, setSelected] = useState([])
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const [studentList, setStudentList] = useState([])
  const [student, setStudent] = useState({}) // for popup modal
  const [deletedLoading, setDeletedLoading] = useState(false)

  useEffect(() => {
    if (showAddPopup) return;
    axios.get(`http://localhost:3500/students/${sub}`).then((res) => {
      setStudentList(res.data)
    })
  }, [showAddPopup])

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
    setDeletedLoading(true)
    try {
      await axios.delete(`http://localhost:3500/students`, { data: { record_id: id } })
    } catch (err) {
      console.log(err)
    }

    axios.get(`http://localhost:3500/students/${sub}`).then((res) => {
      setDeletedLoading(false)
      setSelected([])
      setStudentList(res.data)
    })
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

  if (deletedLoading) return <div className="flex h-screen bg-[#FFFDE8] justify-center items-center align-middle"><RingLoader /></div>;

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
            />
          )
        })}
      </div>
    </div>
  )
}

export default Students
